/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from './AppError';
import OperatorDomain from '../domains/OperatorDomain';
import express = require('express');
import fs = require('fs');
import path = require('path');
import CreateAPIKeyReqDto from '../resources/dto/CreateAPIKeyReqDto';
/* eslint-enable */

const allowAccessConfig = JSON.parse(fs.readFileSync(path.resolve('./config/allow-access.json'), 'utf-8'));
const defaultRawCertificate = fs.readFileSync(path.resolve('./config/default-raw.crt'), 'utf-8');
export default async function checkCertificateRequest (req: express.Request, dto: CreateAPIKeyReqDto[], operator: OperatorDomain) {
    if (process.env.NODE_ENV === 'test' || req.protocol === 'http') {
        return;
    }
    const xcert = req.headers['x-cert'];
    if (!xcert || typeof xcert !== 'string') {
        throw new AppError('クライアント証明書の情報が設定されていません', 401);
    }

    const clientCertificateString = xcert as string;
    const defaultRawCertificateString = defaultRawCertificate.replace(/\n/g, '');
    if (clientCertificateString !== defaultRawCertificateString) {
        return;
    }

    /* eslint-disable */
    _continue:
    for (const requestDetail of dto) {
        const allowAccess = (() => {
            if (requestDetail.caller.blockCode === requestDetail.target.blockCode) {
                return allowAccessConfig.self;
            } else {
                return allowAccessConfig['pxr-root'];
            }
        })();

        const method = requestDetail.target.apiMethod.toUpperCase();
        const { type } = operator;
        if (Array.isArray(allowAccess[method][type])) {
            const allowPathOnlyArray = allowAccess[method][type];
            for (const allowPath of allowPathOnlyArray) {
                if (new RegExp(allowPath + '').test(requestDetail.target.apiUrl)) {
                    continue _continue;
                }
            }
            throw new AppError('このアクセスには、証明書の発行が必要です。認定申請を開始してください', 401);
        }
    }
}
