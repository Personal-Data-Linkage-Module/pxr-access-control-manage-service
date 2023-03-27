/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import { JsonController, Post, UseBefore, Req, Header, Body, Res, OnUndefined } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import EntityOperation from '../repositories/EntityOperation';
import AccessControlService from '../services/AccessControlService';
import AccessControllerResult from '../services/dto/AccessControllerResult';
import CreateAPIKeyService from '../services/CreateAPIKeyService';
import checkCertificateRequest from '../common/CheckCertificateRequest';
import BaseValidator from './validator/BaseValidator';
import CreateShareContinuousAPIKeyValidator from './validator/CreateShareContinuousAPIKeyValidator';
import CreateShareContinuousAPIKeyReqDto from './dto/CreateShareContinuousAPIKeyReqDto';
import CTokenLedgerService from '../services/CTokenLedgerService';
import CatalogService from '../services/CatalogService';
import BookManageService from '../services/BookManageService';
import SharingDataService from '../services/SharingDataService';
import { applicationLogger } from '../common/logging';
/* eslint-enable */

@JsonController('/access-control-manage')
export default class {
    @Post('/share/continuous')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(BaseValidator)
    @UseBefore(CreateShareContinuousAPIKeyValidator)
    @OnUndefined(204)
    async post (
        @Req() req: Request,
        @Body() dto: CreateShareContinuousAPIKeyReqDto[]
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req, true);

        // 証明書が利用されたアクセスであるかを確認する
        await checkCertificateRequest(req, dto, operator);
        applicationLogger.info('access-token:' + req.headers['access-token']);
        // リクエストヘッダーからアクセストークンを取得
        const accessToken = req.headers['access-token'] as string;

        // DTOの配列分、ループしてAPIキーを取得する
        const result: AccessControllerResult[] = [];
        for (const item of dto) {
            // エンティティの初期化
            const entity = await CreateAPIKeyService.convert(item, operator);

            // リクエストボディから必要なデータ種を取り出す
            const { userId, document, event, thing, actor, dest } = item.caller.requestBody;

            // PXR-IDを取得する
            let wf = null;
            let app = null;
            let pxrId = null;
            let destActor = null;
            if (dest) {
                const user = await BookManageService.getUserInfoOnlyOne(operator, userId, dest.actor);
                pxrId = user.pxrId;
                wf = undefined;
                app = dest.app ? dest.app : undefined;
                destActor = dest.actor;
            } else {
                const user = await BookManageService.getUserInfoOnlyOne(operator, userId);
                pxrId = user.pxrId;
                wf = undefined;
                app = item.caller.operator.app ? item.caller.operator.app._value : undefined;
            }

            // Region参加チェク
            await CreateAPIKeyService.checkRegionJoin(app, wf, operator);

            // アクセストークンの検証を行う
            if (dest) {
                await CreateAPIKeyService.checkAccessToken(accessToken, 'share', userId, destActor, app, wf, operator);
            } else {
                await CreateAPIKeyService.checkAccessToken(accessToken, 'share', userId, operator.actorCode, app, wf, operator);
            }

            // 共有定義カタログコードの配列を取得する
            const sharingDefs = await BookManageService.getContinuousSharingDataDefinitionCatalogCodeList(operator, userId, wf, app, destActor);

            // 共有定義カタログで、リクエストされたデータ種を共有することを許可されているか確認する
            await SharingDataService.checkAllowedDataDefinition(sharingDefs, operator, document, event, thing);

            let actorCodes: number[] = [];
            if (actor) {
                actorCodes.push(actor._value);
                // 共有元アクターが指定されている場合、
                await SharingDataService.checkAllowedSharingRestrictionDefinition(actor._value, null, null, operator, document, event, thing, app, wf);
            } else {
                // 共有元アクターが指定されていない場合、CToken台帳サービスにて、CTokenを取得する
                const documentCTokens = await CTokenLedgerService.getCount(operator, pxrId, document, [], []);
                const eventCTokens = await CTokenLedgerService.getCount(operator, pxrId, [], event, []);
                const thingCTokens = await CTokenLedgerService.getCount(operator, pxrId, [], [], thing);
                const cTokens = documentCTokens.concat(eventCTokens).concat(thingCTokens);
                actorCodes = [...new Set(cTokens.map(elem => elem.actor._value))];
                // 取得したCTokenを元に共有先制限定義のチェックを行う
                for (const cToken of cTokens) {
                    const ctokenApp = cToken.app ? cToken.app._value : null;
                    const ctokenWf: number = null;
                    await SharingDataService.checkAllowedSharingRestrictionDefinition(cToken.actor._value, ctokenApp, ctokenWf, operator, document, event, thing, app, wf);
                }
            }

            // アクターコード配列をブロックコード配列にする
            const blockCodes = await CatalogService.getBlockCodesWithActorCodes(actorCodes, operator);

            // ブロックコード分、APIキーを発行する
            for (const blockCode of blockCodes) {
                // ドメインを取得する
                const domains = await CreateAPIKeyService.takeDomain(operator, item.caller.blockCode, blockCode);

                // 宛先パラメーターを欠落させる
                item.target.parameter = null;

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

                // エンティティのアクセス先ブロックコードを上書き
                {
                    const accessHistories = [];
                    for (const elem of entity.tokenAccessHistory) {
                        elem.destinationBlockCatalogCode = blockCode;
                        accessHistories.push(elem);
                    }
                    entity.tokenAccessHistory = accessHistories;
                }

                // エンティティを保存
                await EntityOperation.saveEntity(entity);
            }
        }

        if (!result.length) { return undefined; }
        return result;
    }
}
