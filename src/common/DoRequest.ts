/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import request = require('request');
import { systemLogger } from './logging';
import AppError from './AppError';
import Config from './Config';
import OperatorDomain from '../domains/OperatorDomain';
import { sprintf } from 'sprintf-js';
import fs = require('fs');
import config = require('config');
import path = require('path');
/* eslint-enable */

const Message = Config.ReadConfig('./config/message.json');

/**
 * 汎用性特化型リクエスト関数
 * @param protocol http | https
 * @param uri
 * @param data ボディ相当
 * @param operator リクエスト実施者
 * @param method GET | POST | DELETE | PUTのいずれか
 */
export const PATH_REGEX = /^(http:\/\/){0,1}(https:\/\/){0,1}[0-9a-zA-Z.-:]+\/([0-9a-zA-Z.-]+)\/.*$/;
export async function doRequest (
    protocol: 'http' | 'https',
    uri: string,
    requestData: string,
    method: 'get' | 'post' | 'delete' | 'put',
    operator?: OperatorDomain,
    queryParams?: any
) {
    return new Promise<{
        response: request.Response,
        body: any
    }>((resolve, reject) => {
        let firstPath = 'pxr-service';
        if (PATH_REGEX.test(uri)) {
            firstPath = uri.match(PATH_REGEX)[3];
        }
        // リクエストの詳細を定義
        const options: request.CoreOptions = {
            headers: {
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(requestData),
                accept: 'application/json',
                session: operator ? operator.encoded : ''
            },
            qs: queryParams,
            body: requestData
        };
        // HTTPS通信の場合、クライアント証明書を使用するオプションを追加
        if (protocol === 'https') {
            options.cert = fs.readFileSync(path.resolve(config.get('cert.client_crt')));
            options.key = fs.readFileSync(path.resolve(config.get('cert.client_key')));
            options.rejectUnauthorized = false;
        }
        try {
            request[method](uri, options, (error: Error, response: request.Response, body: any) => {
                try {
                    if (error) {
                        const message = sprintf(Message.FAILED_CONNECT_SERVICE, firstPath);
                        reject(new AppError(message, 503, error));
                        return;
                    }
                    let responseData: any = body;
                    try {
                        const contentType = response.headers['content-type'] + '';
                        if (responseData && contentType.indexOf('application/json') >= 0) {
                            while (typeof responseData === 'string') {
                                responseData = JSON.parse(responseData);
                            }
                        }
                    } catch (err) {
                        if (err instanceof SyntaxError) {
                            systemLogger.warn('Failed parse to JSON with exception.', err);
                        } else {
                            throw new AppError(Message.RESPONSE_ERROR, 500);
                        }
                    }
                    if (response.statusCode === 400) {
                        const message = sprintf(Message.RESPONSE_IS_NO_DATE, firstPath);
                        throw new AppError(message, 400);
                    } else if (response.statusCode === 404) {
                        const message = sprintf(Message.RESPONSE_IS_NO_DATE, firstPath);
                        throw new AppError(message, 404);
                    } else if (response.statusCode !== 204 && response.statusCode !== 200) {
                        const message = sprintf(Message.SERVICE_IS_UNABLE, firstPath);
                        throw new AppError(message, 500);
                    }
                    resolve({
                        response: response,
                        body: responseData
                    });
                } catch (err) {
                    reject(err);
                }
            });
        } catch (err) {
            const message = sprintf(Message.FAILED_CONNECT_SERVICE, firstPath);
            reject(new AppError(message, 503, err));
        }
    });
}

/**
 * GETリクエストを実行する
 * @param uri 宛先となるURI
 * @param options リクエストオプション
 */
export async function doGetRequest (uri: string, options?: request.CoreOptions) {
    return new Promise<{
        response: request.Response,
        body: any
    }>((resolve, reject) => {
        // UUIDを発行
        // const uid = uuid();

        // リクエスト時のログを出力
        // applicationLogger.warn(sprintf('[%s][%s] external url:%s start', contextService.get('request:requestId'), uid, uri));

        // 開始時間を取得
        // const startTime = performance.now();
        request.get(uri, options, (error: Error, response: request.Response, body: any) => {
            // 終了時間を取得
            // const endTime = performance.now();

            // 処理時間を取得
            // const duration = endTime - startTime;

            // レスポンス時のログを出力
            // applicationLogger.warn(sprintf('[%s][%s] external url:%s finish time:%dmsec', contextService.get('request:requestId'), uid, uri, duration));
            if (error) {
                reject(error);
                return;
            }
            let data: any = body;
            try {
                const contentType = response.headers['content-type'] + '';
                if (data && contentType.indexOf('application/json') >= 0) {
                    while (typeof data === 'string') {
                        data = JSON.parse(data);
                    }
                }
            } catch (err) {
                if (err instanceof SyntaxError) {
                    systemLogger.warn('Failed parse to JSON with exception.', err);
                } else {
                    throw new AppError(Message.RESPONSE_ERROR, 500);
                }
            }
            resolve({
                response: response,
                body: data
            });
        });
    });
}

/**
 * POSTリクエストを実行する
 * @param uri 宛先となるURI
 * @param options リクエストオプション
 */
export async function doPostRequest (uri: string, options?: request.CoreOptions) {
    return new Promise<{
        response: request.Response,
        body: any
    }>((resolve, reject) => {
        // UUIDを発行
        // const uid = uuid();

        // リクエスト時のログを出力
        // applicationLogger.warn(sprintf('[%s][%s] external url:%s start', contextService.get('request:requestId'), uid, uri));

        // 開始時間を取得
        // const startTime = performance.now();
        request.post(uri, options, (error: Error, response: request.Response, body: any) => {
            // 終了時間を取得
            // const endTime = performance.now();

            // 処理時間を取得
            // const duration = endTime - startTime;

            // レスポンス時のログを出力
            // applicationLogger.warn(sprintf('[%s][%s] external url:%s finish time:%dmsec', contextService.get('request:requestId'), uid, uri, duration));
            if (error) {
                reject(error);
                return;
            }
            let data: any = body;
            try {
                const contentType = response.headers['content-type'] + '';
                if (data && contentType.indexOf('application/json') >= 0) {
                    while (typeof data === 'string') {
                        data = JSON.parse(data);
                    }
                }
            } catch (err) {
                if (err instanceof SyntaxError) {
                    systemLogger.warn('Failed parse to JSON with exception.', err);
                } else {
                    throw new AppError(Message.RESPONSE_ERROR, 500);
                }
            }
            resolve({
                response: response,
                body: data
            });
        });
    });
}
