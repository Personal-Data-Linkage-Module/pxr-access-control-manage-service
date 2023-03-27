/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    Request
} from 'express';
import CreateAPIKeyReqDto from '../dto/CreateAPIKeyReqDto';
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import OperatorDomain from '../../domains/OperatorDomain';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
/* eslint-enable */

const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class BaseValidator implements ExpressMiddlewareInterface {
    dto: CreateAPIKeyReqDto[];

    readonly methods = [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ];

    readonly operatorType = [
        0,
        2,
        3
    ];

    async use (request: any, response: any, next: (err?: any) => any) {
        await this.base(request);
        next();
    }

    /**
     * 共通リクエストデータ
     * @param req
     */
    async base (req: Request | any) {
        const dto = await transformAndValidate(CreateAPIKeyReqDto, req.body);
        if (!Array.isArray(dto)) {
            throw new AppError('リクエストが配列ではありません', 400);
        }
        this.dto = dto;
        for (const item of dto) {
            // メソッドが規定外
            if (
                !this.methods.includes(item.caller.apiMethod) ||
                !this.methods.includes(item.target.apiMethod)
            ) {
                throw new AppError(Message.METHOD_IS_NOT_ALLOWED, 400);
            }

            // オペレーター種別が規定外
            if (!this.operatorType.includes(item.caller.operator.type)) {
                throw new AppError(Message.OPERATOR_TYPE_IS_NOT_ALLOWED, 400);
            }

            // オペレーター種別により、制御をかける
            if (item.caller.operator.type === OperatorDomain.TYPE_PERSONAL_NUMBER || item.caller.operator.type === OperatorDomain.TYPE_MANAGER_NUMBER) {
                if (!item.caller.operator.loginId) {
                    throw new AppError(Message.IF_PERSONAL_VALUE_IS_MISSED, 400);
                }
            } else {
                // appオブジェクトが設定されていることを確認する
                if (!item.caller.operator.app) {
                    throw new AppError(Message.IF_APP_REQUIRED_VALUE_IS_MISSED, 400);
                }
            }

            // wfオブジェクトが設定されていないことを確認する
            if (item.caller.operator.wf) {
                throw new AppError(Message.IF_WF_HAS_BEEN_SPECIFIED, 400);
            }
        }
    }
}
