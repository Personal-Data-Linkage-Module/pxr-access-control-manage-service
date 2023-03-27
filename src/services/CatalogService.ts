/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import BlockCatalogDomain from '../domains/BlockCatalogDomain';
import config = require('config');
import Config from '../common/Config';
import { doRequest } from '../common/DoRequest';
import AppError from '../common/AppError';
import { sprintf } from 'sprintf-js';
import { transformAndValidate } from 'class-transformer-validator';
import ActorCatalogDomain from '../domains/ActorCatalogDomain';
import OperatorDomain from '../domains/OperatorDomain';
import SharingCatalog from '../domains/SharingCatalog';
import SharingRestrintionCatalog from '../domains/SharingRestrintionCatalog';
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */

const Message = Config.ReadConfig('./config/message.json');

/**
 * カタログサービスとの連携クラス
 */
export default class CatalogService {
    /** ブロック名の正規表現 */
    static BLOCK_NAME_SPACE = /^catalog\/.*\/block\/(.*)$/;

    /**
     * データ共有定義に関するカタログを取得する
     * @param sharingCode
     * @param operator
     * @param includeDeleted 論理削除済データ取得フラグ
     */
    static async getSharingCatalog (sharingCode: number, sharingVersion: number, operator: OperatorDomain, includeDeleted = false) {
        const result = await this.getCodeVersion(operator, sharingCode, sharingVersion, includeDeleted);
        try {
            const domain = await transformAndValidate(SharingCatalog, result.body) as SharingCatalog;
            return domain;
        } catch (err) {
            const str = sprintf('カタログサービスにて取得したカタログを状態共有機能への変換に失敗しました(コード値: %s)', sharingCode);
            throw new AppError(str, 500, err);
        }
    }

    /**
     * 共有先制限定義に関するカタログを取得する
     * @param actorCode
     * @param app
     * @param wf
     * @param operator
     */
    static async getSharingRestrictionCatalog (actorCode: number, app: number, wf: number, operator: OperatorDomain) {
        const extName = config.get('catalogService.extName');
        // let ns = null;
        // let result = null;
        const ns = 'catalog/ext/' + extName + '/actor/app/actor_' + actorCode + '/sharing-restriction';
        const result = await this.get(operator, null, ns);
        if (result.body.length <= 0) {
            return null;
        }

        try {
            const domain = await transformAndValidate(SharingRestrintionCatalog, result.body) as SharingRestrintionCatalog[];
            return domain;
        } catch (err) {
            const str = sprintf('カタログサービスにて取得したカタログを共有先制限定義への変換に失敗しました(ネームスペース: %s)', ns);
            throw new AppError(str, 500, err);
        }
    }

    /**
     * アクターコードの配列から、その分ブロックコードを特定して配列にする
     * @param actorCodes
     * @param operator
     */
    static async getBlockCodesWithActorCodes (actorCodes: number[], operator: OperatorDomain) {
        const blockCodes = [];
        for (const actorCode of actorCodes) { blockCodes.push(await this.getBlockCodeWithActorCode(actorCode, operator)); }
        return blockCodes;
    }

    /**
     * アクターコードをつかって、メインブロックを特定する
     * @param actorCode
     * @param operator
     */
    static async getBlockCodeWithActorCode (actorCode: number, operator: OperatorDomain) {
        const actorCatalog = await this.getActorCatalog(actorCode, operator);
        return actorCatalog.template['main-block']._value;
    }

    /**
     * ブロックカタログの取得を行う
     * @param code コード
     */
    static async getBlockCatalog (code: number, operator: OperatorDomain) {
        const result = await this.get(operator, code);
        try {
            const domain = await transformAndValidate(BlockCatalogDomain, result.body) as BlockCatalogDomain;
            return domain;
        } catch (err) {
            throw new AppError(sprintf(Message.REQUEST_CODE_IS_NOT_BLOCK, code), 400, err);
        }
    }

    /**
     * アクターのカタログを取得する
     * @param code
     */
    static async getActorCatalog (code: number, operator: OperatorDomain) {
        const result = await this.get(operator, code);
        try {
            const domain = await transformAndValidate(ActorCatalogDomain, result.body) as ActorCatalogDomain;
            return domain;
        } catch (err) {
            const str = sprintf('このコードは、アクターのカタログではありません(コード値: %s)', code);
            throw new AppError(str, 500, err);
        }
    }

    /**
     * アクターのカタログの設定カタログを取得する
     * @param domain
     */
    static async getSettingCatalogOfDataActor (domain: ActorCatalogDomain, operator: OperatorDomain) {
        const { ns } = domain.catalogItem;
        const matches = ns.match(/^(catalog\/ext\/[0-9a-zA-Z_.-]{1,})(\/actor\/data-trader)$/);
        if (matches) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
    }

    /**
     * カタログコードから、カタログサービスよりカタログ情報を取得する
     * @param code カタログコード
     */
    static async get (operator: OperatorDomain, code?: number, ns?: string) {
        const url = config.get('catalogService.get') + '' + (code || `?ns=${encodeURIComponent(ns)}`);
        try {
            const result = await doRequest('http', url, '', 'get', operator);
            return result;
        } catch (err) {
            if (err instanceof AppError && err.statusCode === 404) {
                return { body: [] as any };
            }
            throw err;
        }
    }

    /**
     * カタログコード、バージョンから、カタログサービスよりカタログ情報を取得する
     * @param code カタログコード
     * @param version カタログバージョン
     * @param includeDeleted 論理削除済データ取得フラグ
     */
    static async getCodeVersion (operator: OperatorDomain, code: number, version: number, includeDeleted = false) {
        const url = config.get('catalogService.get') + '' + code + '/' + version + '/?includeDeleted=' + includeDeleted;
        const result = await doRequest('http', url, '', 'get', operator);
        return result;
    }

    /**
     * extNameを取得する
     * @param operator
     */
    static async getExtName (operator: OperatorDomain) {
        const url = config.get('catalogService.get') + 'name';
        const result = await doRequest('http', url, '', 'get', operator);
        return result.body['ext_name'];
    }

    /**
     * グローバル設定を取得する
     * @param extName
     * @param operator
     */
    static async getGlobalSetting (extName: string, operator: OperatorDomain) {
        const ns = `catalog/ext/${extName}/setting/global`;
        const url = config.get('catalogService.get') + '?ns=' + ns;
        const result = await doRequest('http', url, '', 'get', operator);
        return result.body[0];
    }

    /**
     * アクセストークン検証要否定義を取得する
     * @param extName
     * @param ActorCode
     * @param app
     * @param wf
     * @param operator
     */
    static async getAccessTokenVerifySetting (extName: string, actorCode: number, app: number, wf: number, operator: OperatorDomain) {
        let ns = null;
        if (app) {
            ns = `catalog/ext/${extName}/actor/app/actor_${actorCode}/verify-access-token`;
        }
        const url = config.get('catalogService.get') + '?ns=' + ns;
        try {
            const result = await doRequest('http', url, '', 'get', operator);
            return result.body[0];
        } catch (err) {
            if (err instanceof AppError && err.statusCode === 404) {
                return null;
            }
            throw err;
        }
    }
}
