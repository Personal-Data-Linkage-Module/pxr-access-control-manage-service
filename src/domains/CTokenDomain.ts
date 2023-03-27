/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { transformToNumber } from '../common/Transform';
import { CodeObject as _CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;

    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _ver: number;
}

export class CToken {
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

    @IsString()
    @IsDefined()
    createdAt: string;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(type => CodeObject)
    code: CodeObject;

    @IsString()
    @IsDefined()
    identifier: string;
}

export default class {
    @IsOptional()
    @IsArray()
    @Type(type => CToken)
    @ValidateNested({ each: true })
    document: CToken[];

    @IsOptional()
    @IsArray()
    @Type(type => CToken)
    @ValidateNested({ each: true })
    event: CToken[];

    @IsOptional()
    @IsArray()
    @Type(type => CToken)
    @ValidateNested({ each: true })
    thing: CToken[];

    @IsBoolean()
    @IsDefined()
    isDocument: boolean;

    @IsBoolean()
    @IsDefined()
    isEvent: boolean;

    @IsBoolean()
    @IsDefined()
    isThing: boolean;
}
