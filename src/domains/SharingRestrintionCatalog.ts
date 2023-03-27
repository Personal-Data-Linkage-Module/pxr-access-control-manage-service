/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { CodeObject } from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

export class Service {
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
    region: CodeObject;

    @IsOptional()
    @IsArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    service: CodeObject[];
}

export class DocEvent {
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
    code: CodeObject;

    @IsOptional()
    @IsArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    thing: CodeObject[];
}

export class Document {
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
    code: CodeObject;

    @IsOptional()
    @IsArray()
    @Type(type => DocEvent)
    @ValidateNested({ each: true })
    event: DocEvent[];

    @IsOptional()
    @IsArray()
    @Type(type => Service)
    @ValidateNested({ each: true })
    permission: Service[];

    @IsOptional()
    @IsArray()
    @Type(type => Service)
    @ValidateNested({ each: true })
    prohibition: Service[];
}

export class Event {
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
    code: CodeObject;

    @IsOptional()
    @IsArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    thing: CodeObject[];

    @IsOptional()
    @IsArray()
    @Type(type => Service)
    @ValidateNested({ each: true })
    permission: Service[];

    @IsOptional()
    @IsArray()
    @Type(type => Service)
    @ValidateNested({ each: true })
    prohibition: Service[];
}

export class Thing {
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested()
    code: CodeObject;

    @IsOptional()
    @IsArray()
    @Type(type => Service)
    @ValidateNested({ each: true })
    permission: Service[];

    @IsOptional()
    @IsArray()
    @Type(type => Service)
    @ValidateNested({ each: true })
    prohibition: Service[];
}

export class Template {
    @IsOptional()
    @IsArray()
    @Type(type => Document)
    @ValidateNested({ each: true })
    document: Document[];

    @IsOptional()
    @IsArray()
    @Type(type => Event)
    @ValidateNested({ each: true })
    event: Event[];

    @IsOptional()
    @IsArray()
    @Type(type => Thing)
    @ValidateNested({ each: true })
    thing: Thing[];
}

export default class {
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(type => Template)
    template: Template;
}
