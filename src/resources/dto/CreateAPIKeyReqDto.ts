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
    IsArray
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

export class CodeObject {
    @Transform(transformToNumber)
    @IsNumber()
    @IsDefined()
    _value: number;

    @Transform(transformToNumber)
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

    @Transform(transformToNumber)
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

    @Transform(transformToNumber)
    @IsNumber()
    @IsOptional()
    blockCode: number;

    parameter: any;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    _code: any[] = [];
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
