/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsOptional, ValidateNested, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { transformToNumber } from '../common/Transform';
import { CodeObject as _CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

export class CodeObject {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _value: number;
}

export class ShareObject {
    @IsDefined()
    @IsObject()
    @Type(type => _CodeObject)
    @ValidateNested()
    code: _CodeObject;
}

export default class {
    id: number;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(type => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    @IsOptional()
    @IsObject()
    @Type(type => CodeObject)
    @ValidateNested()
    app: CodeObject;

    @IsOptional()
    @IsObject()
    @Type(type => CodeObject)
    @ValidateNested()
    wf: CodeObject;

    @IsDefined()
    @IsArray()
    @Type(type => ShareObject)
    @ValidateNested()
    share: ShareObject[];
}
