/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { transformToNumber } from '../common/Transform';
import { CodeObject as _CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

export class CodeObject {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _value: number;
}

export default class {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    id: number;

    @IsNotEmpty()
    @IsString()
    pxrId: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(type => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    @Type(type => CodeObject)
    @ValidateNested()
    app: CodeObject;

    @IsOptional()
    @IsNotEmptyObject()
    @IsObject()
    @Type(type => CodeObject)
    @ValidateNested()
    wf: CodeObject;

    @IsOptional()
    @IsArray()
    @Type(type => _CodeObject)
    @ValidateNested({ each: true })
    document: _CodeObject[];

    @IsOptional()
    @IsArray()
    @Type(type => _CodeObject)
    @ValidateNested({ each: true })
    event: _CodeObject[];

    @IsOptional()
    @IsArray()
    @Type(type => _CodeObject)
    @ValidateNested({ each: true })
    thing: _CodeObject[];

    @IsOptional()
    @IsArray()
    identifier: any[];
}
