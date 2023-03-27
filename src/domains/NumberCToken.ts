/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { transformToNumber } from '../common/Transform';
import { CodeObject as _CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;
}

export class a {
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(type => _CodeObject)
    _code: _CodeObject;

    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    count: number;
}

export default class {
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(type => CodeObject)
    actor: CodeObject;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(type => CodeObject)
    app: CodeObject;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(type => CodeObject)
    wf: CodeObject;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(type => a)
    document: a;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(type => a)
    event: a;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(type => a)
    thing: a;
}
