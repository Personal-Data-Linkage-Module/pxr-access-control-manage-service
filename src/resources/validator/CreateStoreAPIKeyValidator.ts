/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    Request,
    Response,
    NextFunction
} from 'express';
import BaseValidator from './BaseValidator';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { Middleware } from 'routing-controllers';
/* eslint-enable */

const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class CreateStoreAPIKeyValidator extends BaseValidator {
    async use (request: Request, response: Response, next: NextFunction) {
        // ベースのバリデーターを実行する
        await this.base(request);
        for (const item of this.dto) {
            // UserIDが必須値
            if (!item.caller.userId) {
                throw new AppError(Message.IF_OTHER_API_KEY_REQUIRED_VALUE, 400);
            }
            // 対象のデータ種が正しく取得できなかった場合
            if (item.target.apiMethod !== 'DELETE') {
                if (!Array.isArray(item.caller.requestBody) || !item.caller.requestBody.length) {
                    throw new AppError(Message.MISSING_TARGET_DATA_TYPE, 400);
                }
            }
        }
        next();
    }
}
