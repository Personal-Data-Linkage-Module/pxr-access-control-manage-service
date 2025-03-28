/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { IsNotEmptyArray, transformToNumber } from '../../common/Transform';
import { OperatorObject, TargetObject } from './CreateAPIKeyReqDto';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    @Transform(({ value }) => { return transformToNumber(value); })
        _value: number;

    @IsNumber()
    @IsDefined()
    @Transform(({ value }) => { return transformToNumber(value); })
        _ver: number;
}

export class Destination {
    @IsNumber()
    @IsDefined()
    @Transform(({ value }) => { return transformToNumber(value); })
        actor: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => { return transformToNumber(value); })
        app: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => { return transformToNumber(value); })
        wf: number;
}

export class RequestBody {
    @IsString()
    @IsNotEmpty()
        userId: string;

    @IsOptional()
    @IsArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
        document: CodeObject[];

    @IsOptional()
    @IsArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
        event: CodeObject[];

    @IsOptional()
    @IsArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
        thing: CodeObject[];

    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
        actor: CodeObject;

    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
        app: CodeObject;

    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
        wf: CodeObject;

    @IsOptional()
    @Type(type => Destination)
    @ValidateNested()
        dest: Destination;
}

export class CallerObject {
    @IsUUID('all')
    @IsDefined()
        apiCode: string;

    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsOptional()
        blockCode: number;

    @IsString()
    @IsDefined()
        apiUrl: string;

    @IsString()
    @IsDefined()
        apiMethod: string;

    @IsString()
    @IsOptional()
        userId: string;

    @IsString()
    @IsOptional()
        identificationCode: string;

    @IsDefined()
    @Type(() => OperatorObject)
    @ValidateNested()
        operator: OperatorObject;

    @IsDefined()
    @ValidateNested({ each: false })
    @Type(type => RequestBody)
    @IsObject()
    @IsNotEmptyObject()
        requestBody: RequestBody;
}

export default class {
    @IsDefined()
    @Type(() => CallerObject)
    @ValidateNested()
        caller: CallerObject;

    @IsDefined()
    @Type(() => TargetObject)
    @ValidateNested()
        target: TargetObject;
}
