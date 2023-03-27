/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsString,
    IsOptional,
    IsDefined,
    ValidateNested,
    IsNumber,
    IsNotEmpty
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformToNumber } from '../common/Transform';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;

    @IsNumber()
    @IsOptional()
    @Transform(transformToNumber)
    _ver: number;
}

export class CatalogItem {
    @IsString()
    @IsNotEmpty()
    ns: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => CodeObject)
    @ValidateNested()
    @IsDefined()
    _code: CodeObject;

    @Type(() => CodeObject)
    @ValidateNested()
    @IsDefined()
    inherit: CodeObject;
}

export class Template {
    @IsDefined()
    @ValidateNested()
    @Type(type => CodeObject)
    'main-block': CodeObject;
}

/**
 * カタログ ドメインオブジェクト
 */
export default class ActorCatalogDomain {
    @Type(() => CatalogItem)
    @ValidateNested()
    @IsDefined()
    catalogItem: CatalogItem;

    @Type(type => Template)
    @ValidateNested()
    @IsDefined()
    template: Template;
}
