/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-disable */
import config = require('config');
import AppError from '../common/AppError';
import { doRequest } from '../common/DoRequest';
import { applicationLogger } from '../common/logging';
import NumberCToken from '../domains/NumberCToken';
import OperatorDomain from '../domains/OperatorDomain';
import { CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

export default class {
    /**
     * 件数取得APIを呼び出す
     * @param operator
     * @param document
     * @param event
     * @param thing
     */
    static async getCount (operator: OperatorDomain, pxrId: string, document: CodeObject[], event: CodeObject[], thing: CodeObject[]) {
        const url = config.get('cTokenLedgerService.getCount') + '';
        const data = JSON.stringify({ pxrId, document, event, thing });
        const result = await doRequest('http', url, data, 'post', operator);
        if (result.response.statusCode === 204) {
            throw new AppError('CToken台帳サービス.件数検索APIの結果が0件でした', 400);
        }
        try {
            const domain = await transformAndValidate(NumberCToken, result.body) as NumberCToken[];
            return domain;
        } catch (err) {
            throw new AppError('CToken台帳サービス.件数検索APIの結果を内部処理用の変換に失敗しました', 500, err);
        }
    }

    /**
     * CToken取得APIを呼び出す
     * @param operator
     * @param identifier
     * @param event
     * @param thing
     */
    static async getCToken (operator: OperatorDomain, pxrId: string, documentIdentifier: string[], eventIdentifier: string[], thingIdentifier: string[]) {
        const url = config.get('cTokenLedgerService.getCToken') + '';
        // ドキュメント
        let json;
        if (documentIdentifier && documentIdentifier.length > 0) {
            json = {
                pxrId,
                identifier: {
                    document: documentIdentifier
                }
            };
        } else if (eventIdentifier && eventIdentifier.length > 0) {
            json = {
                pxrId,
                identifier: {
                    event: eventIdentifier
                }
            };
        } else if (thingIdentifier && thingIdentifier.length > 0) {
            json = {
                pxrId,
                identifier: {
                    thing: thingIdentifier
                }
            };
        }
        const data = JSON.stringify(json);
        applicationLogger.info('getCToken.request: ' + data);
        const result = await doRequest('http', url, data, 'post', operator);
        applicationLogger.info('getCToken.response: ' + JSON.stringify(result.body));
        return result.body;
    }
}
