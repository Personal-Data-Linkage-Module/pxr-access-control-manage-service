/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import BlockCatalogDomain from '../domains/BlockCatalogDomain';
import CreateAPIKeyReqDto from '../resources/dto/CreateAPIKeyReqDto';
import { doRequest } from '../common/DoRequest';
import OperatorDomain from '../domains/OperatorDomain';
import config = require('config');
import moment = require('moment');
import { DateTimeFormatString } from '../common/Transform';
import { transformAndValidate } from 'class-transformer-validator';
import AccessControllerResult from './dto/AccessControllerResult';
import AppError from '../common/AppError';
import BookManageService from './BookManageService';
/* eslint-enable */

/**
 * アクセス制御サービス
 */
export default class AccessControlService {
    /**
     * アクセス制御サービス APIキー生成指示API 呼び出し
     * @param toDomain
     * @param fromDomain
     * @param targetBlockCode
     * @param item
     */
    static async create (
        toDomain: BlockCatalogDomain,
        fromDomain: BlockCatalogDomain,
        item: CreateAPIKeyReqDto,
        operator: OperatorDomain
    ) {
        // 個人であればstatusを確認する
        if (operator.type === OperatorDomain.TYPE_PERSONAL_NUMBER) {
            await this.judge(item.target.apiUrl, operator);
        }

        // リクエストデータを生成する
        const at = moment(new Date())
            .add(parseInt(config.get('standardTime')), 'hours')
            .add(parseInt(config.get('defaultExpire.addMinutes')), 'minutes')
            .format(DateTimeFormatString);
        const data = [{
            caller: {
                blockCode: item.caller.blockCode,
                apiUrl: item.caller.apiUrl,
                apiMethod: item.caller.apiMethod,
                userId: item.caller.userId,
                apiCode: item.caller.apiCode,
                operator: {
                    type: item.caller.operator.type,
                    loginId: item.caller.operator.loginId,
                    role: item.caller.operator.role
                }
            },
            target: {
                _code: item.target._code,
                apiUrl: item.target.apiUrl,
                apiMethod: item.target.apiMethod,
                blockCode: item.target.blockCode,
                expirationDate: at
            }
        }];
        let protocol: 'https' | 'http' = config.get('accessControlService.protocol');
        let url = `${protocol}://${toDomain.template.serviceName}${config.get('accessControlService.first')}`;
        // URLの生成、PXR-Rootであればローカル宛へ
        if (parseInt(config.get('pxr-root.blockCode')) === toDomain.catalogItem._code._value) {
            protocol = config.get('accessControlService.local.protocol');
            url = `${protocol}://localhost${config.get('accessControlService.local.first')}`;
        }

        // アクセス制御サービスへの連携
        const result = await doRequest(
            protocol,
            url,
            JSON.stringify(data),
            'post',
            operator
        );

        // 結果を返却
        if (!Array.isArray(result.body)) {
            return [];
        }
        const res = await this.result(result.body, at, toDomain.catalogItem._code._value);
        return res;
    }

    /**
     * 個人の場合、ステータスを確認して0以外ならエラー（再同意に必要なAPIは例外）
     * @param url
     * @param operator
     */
    private static async judge (url: string, operator: OperatorDomain) {
        const patterns: string[] = [
            '\\/book-manage\\/ind',
            '\\/book-manage\\/',
            '\\/book-manage\\/ind\\/term_of_use\\/request\\/list',
            '\\/book-manage\\/ind\\/term_of_use\\/platform',
            '\\/book-manage\\/ind\\/output\\/code.*',
            '\\/operator\\/session',
            '\\/catalog.*'
        ];
        for (const pattern of patterns) {
            if (RegExp(pattern).test(url)) {
                return;
            }
        }
        const book = await BookManageService.getBookInd(operator);
        const normalStatus = 0;
        if (Number(book['status']) !== normalStatus) {
            throw new AppError('Bookステータスが0以外のため、このAPIは許可されません', 500);
        }
    }

    /**
     * 結果を変換
     * @param result
     */
    private static async result (result: any, expireAt: string, blockCode: number) {
        try {
            const converted = await transformAndValidate(AccessControllerResult, result) as AccessControllerResult[];
            const data = converted.map(elem => {
                elem.expirationDate = expireAt;
                elem.blockCode = blockCode;
                return elem;
            });
            return data;
        } catch (err) {
            throw new AppError('アクセス制御サービスのレスポンスを内部処理用へ変換に失敗しました', 500, err);
        }
    }
}
