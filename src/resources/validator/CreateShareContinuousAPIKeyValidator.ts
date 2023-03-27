/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { transformAndValidate } from 'class-transformer-validator';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import AppError from '../../common/AppError';
import CreateShareContinuousAPIKeyReqDto from '../dto/CreateShareContinuousAPIKeyReqDto';
import BaseValidator from './BaseValidator';
/* eslint-enable */

@Middleware({ type: 'before' })
export default class extends BaseValidator implements ExpressMiddlewareInterface {
    async use (request: any, response: any, next: any) {
        await this.base(request);
        const dto = await transformAndValidate(CreateShareContinuousAPIKeyReqDto, request.body) as CreateShareContinuousAPIKeyReqDto[];
        if (!dto.every(elem => [2].includes(elem.caller.operator.type))) {
            throw new AppError('呼び出しオペレーターは、アプリケーションのみ許可されています', 400);
        }
        if (dto.every(elem => {
            const { document, event, thing } = elem.caller.requestBody;
            return (!document || !document.length) && (!event || !event.length) && (!thing || !thing.length);
        })) {
            throw new AppError('caller.requestBodyにdocument, event, thingのうちいずれも設定されていません', 400);
        }
        next();
    }
}
