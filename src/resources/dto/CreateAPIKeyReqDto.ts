/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    IsUUID,
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
    IsArray,
    IsBoolean
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToBooleanFromString, transformToNumber } from '../../common/Transform';

export class CodeObject {
    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsDefined()
        _value: number;

    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsDefined()
        _ver: number;
}

export class OperatorObject {
    @IsNumber()
    @IsDefined()
        type: number;

    @IsString()
    @IsOptional()
        loginId?: string;

    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
        wf?: CodeObject;

    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
        app?: CodeObject;

    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested({ each: true })
        role?: CodeObject[];
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

    @IsOptional()
        requestBody: any;

    @IsString()
    @IsOptional()
        identificationCode: string;

    @IsDefined()
    @Type(() => OperatorObject)
    @ValidateNested()
        operator: OperatorObject;
}

export class TargetObject {
    @IsString()
    @IsDefined()
        apiUrl: string;

    @IsString()
    @IsDefined()
        apiMethod: string;

    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsOptional()
        blockCode: number;

    parameter: any;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
        _code: any[] = [];

    @Transform(({ value }) => { return transformToBooleanFromString(value); })
    @IsBoolean()
    @IsOptional()
        allowPartialStore: boolean;
}

export default class CreateAPIKeyReqDto {
    @IsDefined()
    @Type(() => CallerObject)
    @ValidateNested()
        caller: CallerObject;

    @IsDefined()
    @Type(() => TargetObject)
    @ValidateNested()
        target: TargetObject;
}
