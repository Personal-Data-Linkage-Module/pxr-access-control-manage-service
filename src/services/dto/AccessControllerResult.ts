/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { IsString, IsDefined, IsOptional } from 'class-validator';

export default class AccessControllerResult {
    @IsString()
    @IsDefined()
    apiUrl: string;

    @IsString()
    @IsDefined()
    apiMethod: string;

    @IsString()
    @IsDefined()
    apiToken: string;

    @IsString()
    @IsOptional()
    userId: string;

    blockCode: number;

    expirationDate: string;
}
