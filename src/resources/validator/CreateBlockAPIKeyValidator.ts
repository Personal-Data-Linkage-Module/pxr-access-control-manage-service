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
import OperatorDomain from '../../domains/OperatorDomain';
import { Middleware } from 'routing-controllers';
/* eslint-enable */

const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class CreateBlockAPIKeyValidator extends BaseValidator {
    async use (request: Request, response: Response, next: NextFunction) {
        // ベースのバリデーターを実行する
        await this.base(request);
        for (const item of this.dto) {
            // 宛先ブロックコードの指定が必要
            if (!item.target.blockCode) {
                throw new AppError(Message.IF_BLOCK_API_KEY_CREATION_REQUIRED_VALUE, 400);
            }
        }
        next();
    }
}
