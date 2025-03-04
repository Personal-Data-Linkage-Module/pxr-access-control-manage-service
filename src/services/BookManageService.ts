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
import Config from '../common/Config';
import { CodeObject } from '../resources/dto/CreateShareContinuousAPIKeyReqDto';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

export default class {
    /**
     * 利用者IDと、アクター、APP/WFからMy-Condition-Bookを特定する
     * @param operator
     * @param userId
     */
    static async getUserInfoOnlyOne (operator: OperatorDomain, userId: string, actor: number, app:number, wf: number) {
        const user = await this.searchUser(userId, operator, actor, app, wf);
        return user;
    }

    /**
     * My-Condition-Book一覧検索APIを呼び出す
     * @param operator
     */
    static async searchUser (userId: string, operator: OperatorDomain, actor: number, app: number, wf: number) {
        // userIdが指定されていて APP/WFの設定がない場合エラー
        if (userId && ((!app && !wf) || (app && wf))) {
            throw new AppError(Message.MISSING_APP_WF_CATALOG_CODE, 400);
        }
        const url = config.get('bookManageService.userSearch') + '';
        const data = JSON.stringify({
            actor: actor,
            app: app,
            wf: wf,
            userId: userId
        });
        const result = await doRequest('http', url, data, 'post', operator);
        if (result.response.statusCode === 204) {
            throw new AppError('Book管理サービス.My-Condition-Book一覧が0件でした', 400);
        }
        try {
            const domain = await transformAndValidate(MyBookListElement, result.body) as MyBookListElement;
            return domain;
        } catch (err) {
            throw new AppError('Book管理サービス.My-Condition-Book一覧の結果を内部処理用に変換することに失敗しました', 500, err);
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

    /**
     * Book管理サービス.蓄積可否判定APIを呼び出し、蓄積可否のチェックを行う
     * @param userId
     * @param wfCode
     * @param appCode
     * @param actorCode
     * @param dataType
     * @param operator
     */
    static async checkStorePermission (userId: string, wfCode: number, appCode: number, actorCode: number, dataType: any[], operator: OperatorDomain, allowPartialStore: boolean = false) {
        let url = config.get('bookManageService.postStorePermission') + '';
        if (allowPartialStore) {
            url = url + '?allowPartialStore=true';
        }
        const data = JSON.stringify({
            userId: userId,
            wfCode: wfCode,
            appCode: appCode,
            actorCode: actorCode,
            datatype: dataType
        });
        const result = await doRequest('http', url, data, 'post', operator);
        if (result.body.checkResult === false) {
            throw new AppError(Message.IS_NOT_EXISTS_DATA_TYPE, 401);
        }
        return result.body;
    }

    /**
     * Book管理サービス.共有可否判定APIを呼び出し、共有可否のチェックを行う
     * @param userId
     * @param wfCode
     * @param appCode
     * @param actorCode
     * @param document
     * @param event
     * @param thing
     * @param sourceActor
     * @param sourceAsset
     * @param operator
     */
    static async checkSharePermission (userId: string, wfCode: number, appCode: number, actorCode: number, document: CodeObject[], event: CodeObject[], thing: CodeObject[], sourceActor: number, sourceAsset: number, operator: OperatorDomain) {
        const url = config.get('bookManageService.postSharePermission') + '';
        const data = JSON.stringify({
            userId: userId,
            wfCode: wfCode,
            appCode: appCode,
            actorCode: actorCode,
            document: document,
            event: event,
            thing: thing,
            sourceActor: sourceActor,
            sourceAsset: sourceAsset
        });
        const result = await doRequest('http', url, data, 'post', operator);
        if (result.body.checkResult === false) {
            throw new AppError('リクエストされたデータ種を共有できるように許可されていません', 401);
        }
        return result.body;
    }
}
