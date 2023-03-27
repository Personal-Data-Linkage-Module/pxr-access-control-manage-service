/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CreateAPIKeyReqDto, { CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
import OperatorDomain from '../domains/OperatorDomain';
import AccessControllerResult from './dto/AccessControllerResult';
import TokenAccessHistory from '../repositories/postgres/TokenAccessHistory';
import TokenGenerationHistory from '../repositories/postgres/TokenGenerationHistory';
import CallerRole from '../repositories/postgres/CallerRole';
import { DateTimeFormatString } from '../common/Transform';
import { sprintf } from 'sprintf-js';
import moment = require('moment');
import AppError from '../common/AppError';
import { doRequest } from '../common/DoRequest';
import BookManageService from './BookManageService';
import IdService from './IdService_Stub';
import CatalogService from './CatalogService';
import config = require('config');
import Config from '../common/Config';
import { applicationLogger } from '../common/logging';
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');
const Permission = Config.ReadConfig('./config/permission.json');

export default class CreateAPIKeyService {
    /**
     * エンティティへ変換
     * @param item
     * @param operator
     */
    static async convert (item: CreateAPIKeyReqDto, operator: OperatorDomain) {
        const entity = new TokenGenerationHistory();
        entity.callerBlockCatalogCode = item.caller.blockCode;
        entity.callerApiUrl = item.caller.apiUrl;
        entity.callerApiCode = item.caller.apiCode;
        entity.callerApiMethod = item.caller.apiMethod;
        entity.callerUserId = item.caller.userId;
        entity.identityCode = item.caller.identificationCode;
        entity.temporaryCode = item.caller.requestBody
            ? item.caller.requestBody.tempShareCode
            : null;
        entity.callerOperatorType = item.caller.operator.type;

        if (item.caller.operator.app) {
            entity.callerApplicationCatalogCode = item.caller.operator.app._value;
            entity.callerApplicationCatalogVersion = item.caller.operator.app._ver;
        }

        entity.createdBy = operator ? operator.loginId : item.caller.userId ? item.caller.userId : item.caller.operator.loginId;
        entity.updatedBy = operator ? operator.loginId : item.caller.userId ? item.caller.userId : item.caller.operator.loginId;
        return entity;
    }

    /**
     * ブロックカタログコードから、カタログを取得する
     * @param callerBlockCode
     * @param targetBlockCode
     */
    static async takeDomain (
        operator: OperatorDomain,
        callerBlockCode: number,
        targetBlockCode: number
    ) {
        const fromCatalog = await CatalogService.getBlockCatalog(callerBlockCode, operator);
        const toCatalog = await CatalogService.getBlockCatalog(targetBlockCode, operator);
        return {
            fromCatalog: fromCatalog,
            toCatalog: toCatalog
        };
    }

    /**
     * 宛先パラメーターを取得し、セットする
     * @param item
     */
    static async addTargetParameter (item: CreateAPIKeyReqDto, operator: OperatorDomain) {
        if (item.target.apiMethod !== 'DELETE') {
            const app = item.caller.operator.app ? item.caller.operator.app._value : null;
            const wf = item.caller.operator.wf ? item.caller.operator.wf._value : null;

            // 蓄積定義の取得
            const dataStore = await this.takeDataStore(
                item.caller.userId, app, wf, operator
            );
            // データ種を取得する
            const targetDataType = item.caller.requestBody;
            const dataTypeObject = await this.checkDataType(
                dataStore, targetDataType
            );
            // データ種を付与
            item.target.parameter = { dataType: dataTypeObject };
        }
    }

    /**
     * APIトークンエンティティを形成する
     * @param tokenList
     * @param entity
     * @param operator
     */
    static async convertTokenList (
        tokenList: AccessControllerResult[],
        entity: TokenGenerationHistory,
        operator: OperatorDomain,
        item: CreateAPIKeyReqDto
    ) {
        const entities = [];
        for (const token of tokenList) {
            const historyEntity = new TokenAccessHistory();
            historyEntity.apiToken = token.apiToken;
            historyEntity.destinationBlockCatalogCode = item.target.blockCode;
            historyEntity.destinationApiMethod = token.apiMethod;
            historyEntity.destinationApiUrl = token.apiUrl;
            historyEntity.destinationUserId = token.userId;
            historyEntity.expirationAt = moment(token.expirationDate, DateTimeFormatString).toDate();
            historyEntity.parameter = JSON.stringify(item.target.parameter);
            historyEntity.status = 1;
            historyEntity.createdBy = operator ? operator.loginId : item.caller.userId ? item.caller.userId : item.caller.operator.loginId;
            historyEntity.updatedBy = operator ? operator.loginId : item.caller.userId ? item.caller.userId : item.caller.operator.loginId;
            entities.push(historyEntity);
        }
        entity.tokenAccessHistory = entities;
    }

    /**
     * 呼び出し権限エンティティを形成する
     * @param item
     * @param entity
     * @param operator
     */
    static async convertRoleEntity (
        item: CreateAPIKeyReqDto,
        entity: TokenGenerationHistory,
        operator: OperatorDomain
    ) {
        const entities = [];
        const roles: CodeObject[] = item.caller.operator.role ? item.caller.operator.role : [];
        for (const role of roles) {
            const roleEntity = new CallerRole();
            roleEntity.callerRoleCatalogCode = role._value;
            roleEntity.callerRoleCatalogVersion = role._ver;
            roleEntity.createdBy = operator ? operator.loginId : item.caller.userId ? item.caller.userId : item.caller.operator.loginId;
            roleEntity.updatedBy = operator ? operator.loginId : item.caller.userId ? item.caller.userId : item.caller.operator.loginId;
            entities.push(roleEntity);
        }
        entity.callerRole = entities;
    }

    /**
     * データ共有定義を取得する
     * @param userId
     * @param app
     * @param wf
     * @param operator
     */
    private static async takeDataStore (
        userId: string, app: number, wf: number, operator: OperatorDomain
    ) {
        // 設定ファイルより、Book管理サービスのURLを取得
        const bookManageServiceURL =
            config.get('bookManageService.protocol') + '://' +
            config.get('bookManageService.first');
        // Book管理サービスデータ蓄積定義取得APIで蓄積定義を取得する
        let requestURL;
        if (app) {
            requestURL = bookManageServiceURL + userId + '?app=' + app;
        } else if (wf) {
            requestURL = bookManageServiceURL + userId + '?wf=' + wf;
        }

        // リクエストを実行する
        const result = await doRequest(config.get('bookManageService.protocol'), requestURL, '', 'get', operator);
        // リクエスト結果からBodyを取り出し、戻り値とする
        return result.body;
    }

    /**
     * データ種をチェック
     * @param definition
     * @param dataTypeList
     * RefactorDescription:
     *  #3811 : check(inner)
     */
    private static async checkDataType (definition: any, dataTypeList: any[]) {
        // 定義からドキュメントのコード配列を取り出す
        const documents: any[] = definition['document'] ? definition['document'] : null;
        // 定義からイベントのコード配列を取り出す
        const events: any[] = definition['event'] ? definition['event'] : null;
        // 定義からモノのコード配列を取り出す
        const things: any[] = definition['thing'] ? definition['thing'] : null;
        // イベントもモノも空の場合
        if (!documents && !events && !things) {
            throw new AppError(Message.IS_NOT_EXISTS_DATA_TYPE, 401);
        }

        for (const dataType of dataTypeList) {
            // フラグを初期化
            let existsflg = false;
            existsflg = check(documents, dataType);
            if (!existsflg) {
                existsflg = check(events, dataType);
            }
            // イベントで一致するものが見つからなかった場合
            if (!existsflg) {
                existsflg = check(things, dataType);
            }
            // 1件でも一致するものが見つからなかった場合エラー
            if (!existsflg) {
                throw new AppError(Message.IS_NOT_EXISTS_DATA_TYPE, 401);
            }
        }
        return dataTypeList;

        // データ種が一致するものがあるかチェック
        function check (dataList: any[], dataType: any) {
            let exists = false;
            for (const data of dataList) {
                if (Number(dataType['code']['_value']) === data['_value'] &&
                    Number(dataType['code']['_ver']) === data['_ver']
                ) {
                    // 一致すればフラグをtrueにする
                    exists = true;
                    break;
                }
            }
            return exists;
        }
    }

    /**
     * 権限を確認し、呼び出し先APIへの通信許可評価を行う
     * @param item
     * @param operator
     * @param auth
     */
    static async checkPermission (item: CreateAPIKeyReqDto, operator: OperatorDomain, key: string) {
        const method = item.target.apiMethod;
        const path = item.target.apiUrl;
        const permit = operator.auth[key];
        let array: any = null;
        for (const permissionKey in Permission[method]) {
            const pattern = RegExp(permissionKey);
            if (pattern.test(path)) {
                array = Permission[method][permissionKey];
                break;
            }
        }
        if (!Array.isArray(array)) {
            throw new AppError(Message.NOT_EXISTS_PERMISSION_OF_PATH, 400);
        }

        for (const elem of array) {
            if (permit && permit[elem]) {
                return;
            }
        }
        throw new AppError(Message.REQUEST_OPERATION_NOT_PERMIT, 401);
    }

    /**
     * 操作できるカタログネームスペースか評価を行う
     * @param item
     * @param operator
     * @param auth
     */
    static async checkNs (nss: string[], operator: OperatorDomain) {
        const actorCatalog = await CatalogService.getActorCatalog(operator.actorCode, operator);
        const actorType = actorCatalog.catalogItem.ns.match(/^catalog\/ext\/[0-9a-zA-Z_.-]{1,}\/actor\/(.+)$/);

        const configKey = 'permittedCatalogNs.' + actorType[1];
        let namespaces: string = null;
        try {
            namespaces = config.get(configKey);
        } catch (err) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }

        let isError = false;
        for (const ns of nss) {
            let isExist = false;
            for (let namespace of namespaces) {
                namespace = sprintf(namespace, operator.actorCode);
                if (RegExp(namespace).test(ns)) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                isError = true;
                break;
            }
        }
        if (isError) {
            throw new AppError(Message.REQUEST_OPERATION_NOT_PERMIT, 401);
        }
    }

    /**
     * オペレーターがBook開設できるか確認する
     * @param operator
     */
    static async checkBookCreation (operator: OperatorDomain) {
        const actorCatalog = await CatalogService.getActorCatalog(operator.actorCode, operator);
        await CatalogService.getSettingCatalogOfDataActor(actorCatalog, operator);
    }

    /**
     * 設定しようとしている権限がカタログで許可されているものか確認する
     * @param auth
     * @param configure
     * @param authMe
     * RefactorDescription:
     *  #3811 : checkAuthExists
     *  #3811 : checkActorAuth
     */
    static async checkOperatorAuth (auth: any, operator: OperatorDomain) {
        // 設定しようとしている権限がカタログに定義済みか確認する
        const authCodes = await CreateAPIKeyService.checkAuthExists(auth, operator);

        // アクターに許可された操作権か確認する
        await CreateAPIKeyService.checkActorAuth(authCodes, operator);
    }

    private static async checkAuthExists (auth: any, operator: OperatorDomain) {
        const authCodes: any[] = [];

        // 設定しようとしている権限がカタログに定義済みか確認する
        for (const key in auth) {
            // keyから生成したネームスペースでカタログを取得
            // Ex.catalog/model/auth/member
            const authNs = 'catalog/model/auth/' + key;
            const authCatalogs = await CatalogService.get(operator, null, authNs);

            // keyの中身を1件ずつ取り出す
            for (const actionkey in auth[key]) {
                let isExist = false;

                // 取得してきたカタログでnameが一致するものを取り出す
                if (authCatalogs && authCatalogs.body) {
                    for (const authCatalog of authCatalogs.body) {
                        if (actionkey === authCatalog['template']['auth-name']) {
                            isExist = true;
                            // 後続処理で使用するのでカタログコードを取得
                            const authCode = {
                                _value: authCatalog['catalogItem']['_code']['_value'],
                                _ver: authCatalog['catalogItem']['_code']['_ver']
                            };
                            authCodes.push(authCode);
                            break;
                        }
                    }
                }
                // 1件でも一致しないものがあればエラーとする
                if (!isExist) {
                    throw new AppError(Message.REQUEST_OPERATION_NOT_PERMIT, 401);
                }
            }
        }
        return authCodes;
    }

    private static async checkActorAuth (authCodes: any[], operator: OperatorDomain) {
        let settingNs = null;
        const blockCatalog = await CatalogService.get(operator, operator.blockCode);
        if (operator.actorCode) {
            // アクターがあれば、アクター設定を取得
            settingNs = 'catalog/ext/' + config.get('catalogService.extName') +
                '/setting/actor/' + blockCatalog.body['template']['actor-type'] +
                '/actor_' + operator.actorCode;
        } else {
            // もしアクターがなければ、modelカタログを取得
            settingNs = 'catalog/model/setting/actor/' + blockCatalog.body['template']['actor-type'];
        }
        // カタログからアクター個別設定を取得
        const settingCatalogs = await CatalogService.get(operator, null, settingNs);
        if (!settingCatalogs.body || !Array.isArray(settingCatalogs.body) || !settingCatalogs.body.length) {
            throw new AppError(sprintf('アクター個別設定の取得に失敗しました(ネームスペース: %s)', settingNs), 400);
        }
        for (const authCode of authCodes) {
            let isExist = false;
            // アクター個別設定にて設定されている権限カタログコードを取り出し
            // 設定しようとしている権限のカタログコードと一致するか確認する
            for (const settingAuthGroup of settingCatalogs.body[0]['template']['auth-group']) {
                for (const settingAuth of settingAuthGroup['auth']) {
                    if (authCode['_value'] === settingAuth['_value']) {
                        isExist = true;
                        break;
                    }
                }
            }
            // 1件でも一致しないものがあればエラーとする
            if (!isExist) {
                throw new AppError(Message.REQUEST_OPERATION_NOT_PERMIT, 401);
            }
        }
    }

    /**
     * アクセストークンの検証を行う
     * @param accessToken
     * @param userId
     * @param actorCode
     * @param app
     * @param wf
     * @param operator
     * RefactorDescription:
     *  #3811 : isAccessTokenVerifyRequired
     *  #3811 : verifyAccessToken
     */
    static async checkAccessToken (accessToken: string, type: 'store' | 'share', userId: string, actorCode: number, app: number, wf: number, operator: OperatorDomain, tempShareCode?: string) {
        // グローバル設定を取得する
        const extName = await CatalogService.getExtName(operator);
        const globalSetting = await CatalogService.getGlobalSetting(extName, operator);
        if (globalSetting && globalSetting['template'] && globalSetting['template']['use_id_connect']) {
            // IDサービスを使用する場合、アクセストークン検証要否定義のカタログを取得する
            const catalog = await CatalogService.getAccessTokenVerifySetting(extName, actorCode, app, wf, operator);
            applicationLogger.info('verifyAccessTokenCatalog:' + JSON.stringify(catalog));
            if (catalog) {
                // アクセストークン検証要否を取得
                const requireVerify: boolean = CreateAPIKeyService.isAccessTokenVerifyRequired(catalog, app, wf, type);
                // アクセストークン検証
                if (requireVerify) {
                    await CreateAPIKeyService.verifyAccessToken(accessToken, tempShareCode, operator, userId);
                }
            }
        }
    }

    /**
     * アクセストークン検証
     * @param accessToken
     * @param tempShareCode
     * @param operator
     * @param userId
     */
    private static async verifyAccessToken (accessToken: string, tempShareCode: string, operator: OperatorDomain, userId: string) {
        if (!accessToken) {
            // アクセストークンが取得できない場合エラー
            throw new AppError(Message.NOT_EXIST_ACCESS_TOKEN, 400);
        }
        let pxrId = null;
        if (tempShareCode) {
            // 一時的共有定義を取得してPXR-IDを特定
            const sharingTemporaryDefinition = await BookManageService.getTemporarySharingDataDefinitionData(operator, tempShareCode);
            // Bookのステータスが 0：通常 以外ならエラー
            if (Number(sharingTemporaryDefinition.status) !== 0) {
                throw new AppError(Message.INVALID_USER_BOOK, 400);
            }
            pxrId = sharingTemporaryDefinition.pxrId;
        } else {
            // Book管理サービス Book一覧取得を呼出し、呼び出し元のアクターと利用者IDが一致するBookを見つけPXR-IDを特定
            const user = await BookManageService.getUserInfoOnlyOne(operator, userId);
            const status = Number(Array.isArray(user) ? user[0]['bookStatus'] : user['bookStatus']);
            // Bookのステータスが 0：通常 以外ならエラー
            if (status !== 0) {
                throw new AppError(Message.INVALID_USER_BOOK, 400);
            }
            pxrId = user['pxrId'];
        }
        // アクセストークンを使用し、IDサービスからPXR-IDを取得
        const pxrIdFromIdService = await IdService.getPxrId(accessToken);
        if (pxrId !== pxrIdFromIdService) {
            // IDサービスから取得したPXR-IDと 特定したPXR-IDが一致しない場合エラー
            throw new AppError(Message.INVALID_ACCESS_TOKEN, 400);
        }
    }

    /**
     * アクセストークン検証要否
     * @param catalog
     * @param app
     * @param wf
     * @param type
     * @returns アクセストークン検証要否
     */
    private static isAccessTokenVerifyRequired (catalog: any, app: number, wf: number, type: string) {
        let requireVerify: boolean = false;
        const settingInfo = catalog['template']['verifyAccessToken'];
        let verifySetting = null;
        if (app) {
            verifySetting = (settingInfo && Array.isArray(settingInfo) && settingInfo.length > 0) ? settingInfo.filter((elem: any) => Number(elem['service']['_value']) === Number(app)) : null;
        } else {
            verifySetting = (settingInfo && Array.isArray(settingInfo) && settingInfo.length > 0) ? settingInfo.filter((elem: any) => Number(elem['service']['_value']) === Number(wf)) : null;
        }
        applicationLogger.info('verifySetting:' + JSON.stringify(verifySetting));
        // 検証要否判定
        if (verifySetting && verifySetting.length > 0 &&
            ((type === 'store' && verifySetting[0]['verificationRequiredOnStore']) ||
                (type === 'share' && verifySetting[0]['verificationRequiredOnShare']))) {
            requireVerify = true;
        }
        applicationLogger.info('requireVerify:' + requireVerify);
        return requireVerify;
    }

    /**
     * 蓄積データの妥当性チェック
     * @param item
     * @param app
     * @param wf
     * @param operator
     */
    static async checkStoreRequest (item: CreateAPIKeyReqDto, app: number, wf: number, operator: OperatorDomain) {
        let targetActor: number = null;
        let targetApp: number = null;
        const targetWf: number = null;
        // 削除以外の場合チェックを行う
        if (item.target.apiMethod !== 'DELETE') {
            for (const requestBody of item.caller.requestBody) {
                // applicationLogger.info(JSON.stringify(requestBody));
                if (requestBody['app'] && requestBody['app']['app'] && requestBody['app']['app']['value']) {
                    targetActor = requestBody['app']['code']['value']['_value'];
                    targetApp = requestBody['app']['app']['value']['_value'];
                }
                if (!(operator.actorCode === targetActor && ((app && targetApp && app === targetApp) || (wf && targetWf && wf === targetWf)))) {
                    applicationLogger.info('request:' + targetActor + '/' + targetApp + '/' + targetWf);
                    applicationLogger.info('operator:' + operator.actorCode + '/' + app + '/' + wf);
                    // リクエストボディのアクターコード、app/wfのコードがセッション情報から取得したアクターコード、app/wfのコードと一致しない場合エラー
                    throw new AppError(Message.NOT_EQUAL_ACTOR_SERVICE_CODE, 400);
                }
                if (requestBody['userId'] && item.caller.userId !== requestBody['userId']['value']) {
                    // パスパラメーターの利用者IDと蓄積データの個人識別子が一致しない場合、エラー
                    throw new AppError(Message.NOT_EQUAL_USER_ID, 400);
                }
            }
        }
    }

    /**
     * Region参加チェック
     * @param app
     * @param wf
     * @param operator
     */
    static async checkRegionJoin (app: number, wf: number, operator: OperatorDomain) {
        const appWfCode = !app ? wf : app;
        // 呼び出し元app/wfのカタログを取得
        const result = await CatalogService.get(operator, appWfCode);
        const appWfCatalog = result.body;

        if (!appWfCatalog['template']['region-alliance'] || appWfCatalog['template']['region-alliance'].length <= 0) {
            throw new AppError(Message.NOT_JOIN_REGION, 400);
        }
    }
}
