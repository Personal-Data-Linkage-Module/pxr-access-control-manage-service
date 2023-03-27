/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../domains/OperatorDomain';
import config = require('config');
import { doRequest } from '../common/DoRequest';
import { transformAndValidate } from 'class-transformer-validator';
import MyBookListElement from '../domains/MyBookListElement';
import AppError from '../common/AppError';
import SharingDataDefinition from '../domains/SharingDataDefinition';
import TemporarySharingDataDefinition from '../domains/TemporarySharingDataDefinition';
/* eslint-enable */

export default class {
    /**
     * 利用者IDと、その連携先配列から
     * @param operator
     * @param userId
     */
    static async getUserInfoOnlyOne (operator: OperatorDomain, userId: string, actorCode?: number) {
        const user = await this.searchUser(userId, operator, actorCode);
        return Array.isArray(user) ? user[0] : user;
    }

    /**
     * My-Condition-Book一覧検索APIを呼び出す
     * @param operator
     */
    static async searchUser (userId: string, operator: OperatorDomain, actorCode?: number) {
        const url = config.get('bookManageService.userSearch') + '';
        let actor = null;
        if (actorCode) {
            actor = actorCode;
        } else {
            actor = operator.actorCode;
        }
        const data = JSON.stringify({
            actor: actor,
            userId: userId
        });
        const result = await doRequest('http', url, data, 'post', operator);
        if (result.response.statusCode === 204) {
            throw new AppError('Book管理サービス.My-Condition-Book一覧が0件でした', 400);
        }
        try {
            const domain = await transformAndValidate(MyBookListElement, result.body) as MyBookListElement[];
            return domain;
        } catch (err) {
            throw new AppError('Book管理サービス.My-Condition-Book一覧の結果を内部処理用に変換することに失敗しました', 500, err);
        }
    }

    /**
     * 継続的データ共有定義カタログコードのリストを取得する
     * @param operator
     * @param id
     * @param wf
     * @param app
     */
    static async getContinuousSharingDataDefinitionCatalogCodeList (operator: OperatorDomain, id: string, wf?: number, app?: number, actor?: number) {
        const list = await this.getSharingDataDefinitionData(operator, id, wf, app, actor);
        return list;
    }

    /**
     * データ共有定義を取得する
     * @param operator
     * @param id
     * @param wf
     * @param app
     */
    static async getSharingDataDefinitionData (operator: OperatorDomain, id: string, wf?: number, app?: number, actor?: number) {
        const url = config.get('bookManageService.getSharingDataDefinition') + '';
        let qsp = null;
        if (actor) {
            qsp = wf ? { id, wf, actor } : { id, app, actor };
        } else {
            qsp = wf ? { id, wf } : { id, app };
        }
        const result = await doRequest('http', url, '', 'get', operator, qsp);
        if (result.response.statusCode === 204) {
            throw new AppError('Book管理サービス.データ共有定義取得が0件でした', 400);
        }
        try {
            const domain = await transformAndValidate(SharingDataDefinition, result.body) as SharingDataDefinition[];
            return domain;
        } catch (err) {
            throw new AppError('Book管理サービス.データ共有定義取得の結果を内部処理用に変換することに失敗しました', 500, err);
        }
    }

    /**
     * 一時的データ共有コードの照合結果から、許可された共有物についての定義を確認する
     * @param operator
     * @param tempShareCode
     */
    static async getTemporarySharingDataDefinitionData (operator: OperatorDomain, tempShareCode: string) {
        const url = config.get('bookManageService.collationTemporaryShareCode') + '';
        const data = JSON.stringify({ tempShareCode: tempShareCode });
        const result = await doRequest('http', url, data, 'post', operator);
        try {
            const domain = await transformAndValidate(TemporarySharingDataDefinition, result.body) as TemporarySharingDataDefinition;
            return domain;
        } catch (err) {
            throw new AppError('Book管理サービス.一時的データ共有コード照合APIの結果を内部処理用に変換することに失敗しました', 500, err);
        }
    }

    /**
     * Bookの取得
     * @param operator
     * @param tempShareCode
     */
    static async getBookInd (operator: OperatorDomain) {
        const url = config.get('bookManageService.getBookInd') + '';
        try {
            const result = await doRequest('http', url, '', 'get', operator);
            return result.body;
        } catch (err) {
            throw new AppError('Book管理サービス.Book取得に失敗しました', 500, err);
        }
    }
}
