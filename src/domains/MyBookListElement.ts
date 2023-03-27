/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CodeObject } from '../resources/dto/CreateAPIKeyReqDto';

export class Cooperation {
    /**
     * actor
     */
    @IsObject()
    @IsDefined()
    @ValidateNested({ each: false })
    @Type(type => CodeObject)
    actor: CodeObject;

    /**
     * userId
     */
    @IsOptional()
    @IsString()
    userId: string;
}

export default class {
    @IsString()
    @IsNotEmpty()
    pxrId: string;

    @IsNumber()
    @IsNotEmpty()
    bookStatus: number;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: false })
    @Type(type => Cooperation)
    cooperation: Cooperation[];
}
