/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import { JsonController, Post, UseBefore, Req, Header, Body, OnUndefined } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import CreateAPIKeyReqDto from './dto/CreateAPIKeyReqDto';
import CreateStoreAPIKeyValidator from './validator/CreateStoreAPIKeyValidator';
import AccessControlService from '../services/AccessControlService';
import AccessControllerResult from '../services/dto/AccessControllerResult';
import OperatorService from '../services/OperatorService';
import EntityOperation from '../repositories/EntityOperation';
import CreateAPIKeyService from '../services/CreateAPIKeyService';
import checkCertificateRequest from '../common/CheckCertificateRequest';
import OperatorDomain from '../domains/OperatorDomain';
import { applicationLogger } from '../common/logging';
import AppError from '../common/AppError';
import Config from '../common/Config';
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */

const Message = Config.ReadConfig('./config/message.json');

@JsonController('/access-control-manage')
export default class CreateStoreAPIKeyController {
    @Post('/store')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CreateStoreAPIKeyValidator)
    @OnUndefined(204)
    async post (
        @Req() req: Request,
        @Body() dto: CreateAPIKeyReqDto[]
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req, true);

        // 証明書が利用されたアクセスであるかを確認する
        await checkCertificateRequest(req, dto, operator);
        applicationLogger.info('access-token:' + req.headers['access-token']);
        // リクエストヘッダーからアクセストークンを取得
        const accessToken = req.headers['access-token'] as string;
        // セッション情報からapp,wfコードの取得
        let app: number = null;
        const wf: number = null;
        const data = JSON.parse(decodeURIComponent(operator.encoded));
        app = operator.type === OperatorDomain.TYPE_APPLICATION_NUMBER ? parseInt(data['roles'][0]['_value']) : null;
        if (operator.type === OperatorDomain.TYPE_WORKFLOW_NUMBER) {
            throw new AppError(Message.UNSUPPORTED_OPERATOR, ResponseCode.BAD_REQUEST);
        }

        // DTOの配列分、ループしてAPIキーを取得する
        const result: AccessControllerResult[] = [];
        for (const item of dto) {
            // Region参加チェク
            await CreateAPIKeyService.checkRegionJoin(app, wf, operator);

            // アクセストークンの検証を行う
            await CreateAPIKeyService.checkAccessToken(accessToken, 'store', item.caller.userId, operator.actorCode, app, wf, operator);

            // 蓄積データの妥当性チェック
            await CreateAPIKeyService.checkStoreRequest(item, app, wf, operator);

            // エンティティの初期化
            const entity = await CreateAPIKeyService.convert(item, operator);

            // ドメインを取得する
            const domains = await CreateAPIKeyService.takeDomain(operator, item.caller.blockCode, item.target.blockCode);

            // 蓄積定義を取得して、宛先パラメーターを完成させる
            await CreateAPIKeyService.addTargetParameter(item, operator);

            // 宛先のアクセス制御サービス.APIアクセス許可生成 APIをコールする
            const tokenList = await AccessControlService.create(
                domains.toCatalog,
                domains.fromCatalog,
                item,
                operator
            );
            // 結果が空であれば、次の処理へ
            if (!tokenList.length) {
                continue;
            }
            result.push(...tokenList);

            // トークンリスト（アクセス制御サービスの結果）を元に、エンティティを追加
            await CreateAPIKeyService.convertTokenList(tokenList, entity, operator, item);

            // ロールの指定により、エンティティを形成
            await CreateAPIKeyService.convertRoleEntity(item, entity, operator);

            // エンティティを保存
            await EntityOperation.saveEntity(entity);
        }

        if (!result.length) { return undefined; }
        return result;
    }
}
