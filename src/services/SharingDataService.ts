/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../common/AppError';
import OperatorDomain from '../domains/OperatorDomain';
import { CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
import BookManageService from './BookManageService';
import CatalogService from './CatalogService';
import CTokenLedgerService from './CTokenLedgerService';
import SharingDataDefinition from '../domains/SharingDataDefinition';
import { DataType } from '../domains/SharingCatalog';
import { Document, Event, Thing } from '../domains/SharingRestrintionCatalog';
/* eslint-enable */

export default class {
    /**
     * 一時的データ共有のリクエストが定義上、共有を許可したものかを確認する
     * あわせて、後続処理に必要なPXR-IDを一時的データ共有定義から取り出して、返却する
     * @param operator
     * @param tempShareCode
     * @param _document
     * @param _event
     * @param _thing
     * RefactorDescription:
     *  #3811 : checkCodes(inner)
     *  #3811 : checkIdentifier(inner)
     */
    static async getPxrIdWithCheckAllowedTemporarySharedDataDefinition (
        operator: OperatorDomain,
        tempShareCode: string,
        _document: CodeObject[],
        _event: CodeObject[],
        _thing: CodeObject[]
    ) {
        const sharingTemporaryDefinition = await BookManageService.getTemporarySharingDataDefinitionData(operator, tempShareCode);
        {
            const { document, event, thing, identifier } = sharingTemporaryDefinition;
            // データ種が一致するものがあるかチェック
            if (document || event || thing) {
                const documentChecksFlag = checkCodes(_document, document);
                const eventChecksFlag = checkCodes(_event, event);
                const thingChecksFlag = checkCodes(_thing, thing);
                if (!documentChecksFlag || !eventChecksFlag || !thingChecksFlag) {
                    throw new AppError('リクエストされたデータ種を共有できるように許可されていません', 400);
                }
            }

            if (identifier) {
                const docmentIdentifier: string[] = [];
                const eventIdentifier: string[] = [];
                const thingIdentifier: string[] = [];
                for (const def of identifier) {
                    if (def['document']) {
                        docmentIdentifier.push(def['document']);
                    }
                    if (def['event'] && typeof def['event'] === 'string') {
                        eventIdentifier.push(def['event']);
                    }
                    if (def['event'] && Array.isArray(def['event'])) {
                        for (const eve of def['event']) {
                            eventIdentifier.push(eve);
                        }
                    }
                    if (def['thing'] && typeof def['thing'] === 'string') {
                        thingIdentifier.push(def['thing']);
                    }
                    if (def['thing'] && Array.isArray(def['thing'])) {
                        for (const thi of def['thing']) {
                            thingIdentifier.push(thi);
                        }
                    }
                }

                // 識別子で取得したCTokenのデータ種と一致するものがあるかチェック
                const documentChecksFlag = await checkIdentifier(_document, docmentIdentifier, 'document');
                const eventChecksFlag = await checkIdentifier(_event, eventIdentifier, 'event');
                const thingChecksFlag = await checkIdentifier(_thing, thingIdentifier, 'thing');
                if (!documentChecksFlag || !eventChecksFlag || !thingChecksFlag) {
                    throw new AppError('リクエストされたデータ種を共有できるように許可されていません', 400);
                }
            }
        }
        return sharingTemporaryDefinition.pxrId;

        // データ種が一致するものがあるかチェック
        function checkCodes (reqCodes: CodeObject[], defCodes: CodeObject[]) {
            if (!reqCodes || reqCodes.length <= 0) {
                return true;
            } else if (!defCodes || defCodes.length <= 0) {
                return false;
            }
            for (const codeObject of reqCodes) {
                if (!defCodes.some(elem => elem._value === codeObject._value && elem._ver === codeObject._ver)) {
                    return false;
                }
            }
            return true;
        }

        // 識別子で取得したCTokenのデータ種と一致するものがあるかチェック
        async function checkIdentifier (reqCodes: CodeObject[], identifierList: string[], type: 'document' | 'event' | 'thing') {
            if (!reqCodes || reqCodes.length <= 0) {
                return true;
            } else if (identifierList.length <= 0 && (reqCodes && reqCodes.length > 0)) {
                return false;
            }
            const documentIdentifier = type === 'document' ? identifierList : null;
            const eventIdentifier = type === 'event' ? identifierList : null;
            const thingIdentifier = type === 'thing' ? identifierList : null;
            if (identifierList.length > 0) {
                const ctokens = await CTokenLedgerService.getCToken(operator, sharingTemporaryDefinition.pxrId, documentIdentifier, eventIdentifier, thingIdentifier);
                for (const codeObject of reqCodes) {
                    const defCtokens = ctokens[type] as any[];
                    if (!defCtokens.some(elem => elem.code._value === codeObject._value && elem.code._ver === codeObject._ver)) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    /**
     * リクエストされたデータ種配列は、共有先制限定義上許可されているものかを確認する
     * @param actorCode 共有元アクターコード
     * @param app 共有元APP
     * @param wf 共有元WF
     * @param operator
     * @param document
     * @param event
     * @param thing
     * @param callerAppCode
     * @param callerWfCode
     * RefactorDescription:
     *  #3811 : checkRestriction
     */
    static async checkAllowedSharingRestrictionDefinition (
        actorCode: number,
        app: number,
        wf: number,
        operator: OperatorDomain,
        document: CodeObject[],
        event: CodeObject[],
        thing: CodeObject[],
        callerAppCode?: number,
        callerWfCode?: number
    ) {
        // 共有元の共有先制限カタログを取得
        const sharingRestrictionCatalogs = await CatalogService.getSharingRestrictionCatalog(actorCode, app, wf, operator);
        if (!sharingRestrictionCatalogs || sharingRestrictionCatalogs.length <= 0) {
            // 共有先制限のカタログがない場合、チェックはしない
            return;
        }
        const appWfCode = callerAppCode === undefined ? callerWfCode : callerAppCode;
        // 呼び出し元app/wfのカタログを取得
        const result = await CatalogService.get(operator, appWfCode);
        const appWfCatalog = result.body;
        // 呼び出し元の参加リージョン

        const regionCodes: number[] = [];
        if (appWfCatalog['template']['region-alliance']) {
            for (const region of appWfCatalog['template']['region-alliance']) {
                regionCodes.push(region['_value']);
            }
        }
        for (const restrictionCatalog of sharingRestrictionCatalogs) {
            const documentChecksFlag = this.checkRestriction(document, appWfCode, regionCodes, restrictionCatalog.template.document);
            const eventChecksFlag = this.checkRestriction(event, appWfCode, regionCodes, restrictionCatalog.template.event);
            const thingChecksFlag = this.checkRestriction(thing, appWfCode, regionCodes, restrictionCatalog.template.thing);
            if (!documentChecksFlag || !eventChecksFlag || !thingChecksFlag) {
                throw new AppError('共有先制限定義により、リクエストされたデータ種を共有できるように許可されていません', 400);
            }
        }
    }

    private static checkRestriction (reqCodes: CodeObject[], appWfCode: number, regionCodes: number[], dataTypes: Document[] | Event[] | Thing[]) {
        if (!reqCodes || reqCodes.length <= 0) {
            return true;
        } else if (!dataTypes || dataTypes.length <= 0) {
            return true;
        }
        for (const codeObject of reqCodes) {
            if (!dataTypes.some(elem => elem.code._value === codeObject._value && elem.code._ver === codeObject._ver)) {
                return true;
            }
            for (const dataType of dataTypes) {
                if (dataType.code._value === codeObject._value && dataType.code._ver === codeObject._ver) {
                    if (dataType.permission && dataType.permission.length > 0 && dataType.prohibition && dataType.prohibition.length > 0) {
                        throw new AppError('共有先制限定義の許可リストと禁止リストが同時に定義されています', 400);
                    }
                    // 許可リストのチェック
                    if (dataType.permission && dataType.permission.length > 0) {
                        for (const service of dataType.permission) {
                            if (service.region && !service.service && regionCodes.length > 0) {
                                if (!regionCodes.some(elem => elem === service.region._value)) {
                                    return false;
                                }
                            }
                            if (service.service) {
                                if (!service.service.some(elem => elem._value === appWfCode)) {
                                    return false;
                                }
                            }
                        }
                    }
                    // 禁止リストのチェック
                    if (dataType.prohibition && dataType.prohibition.length > 0) {
                        for (const service of dataType.prohibition) {
                            if (service.region && !service.service && regionCodes.length > 0) {
                                if (regionCodes.some(elem => elem === service.region._value)) {
                                    return false;
                                }
                            }
                            if (service.service) {
                                if (service.service.some(elem => elem._value === appWfCode)) {
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
}
