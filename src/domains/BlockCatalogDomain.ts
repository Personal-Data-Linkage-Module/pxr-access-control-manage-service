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
    IsNumber
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    _value: number;

    @IsNumber()
    @IsOptional()
    _ver: number;
}

export class CatalogItem {
    @IsString()
    @IsDefined()
    ns: string;

    @IsString()
    @IsDefined()
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
    @IsString()
    @IsDefined()
    @Expose({ name: 'actor-type' })
    actorType: string;

    @IsString()
    @IsDefined()
    @Expose({ name: 'base-url' })
    baseUrl: string;

    @IsString()
    @IsDefined()
    @Expose({ name: 'service-name' })
    serviceName: string;
}

/**
 * カタログ ドメインオブジェクト
 */
export default class BlockCatalogDomain {
    @Type(() => CatalogItem)
    @ValidateNested()
    @IsDefined()
    catalogItem: CatalogItem;

    @Type(() => Template)
    @ValidateNested()
    @IsDefined()
    template: Template;
}
