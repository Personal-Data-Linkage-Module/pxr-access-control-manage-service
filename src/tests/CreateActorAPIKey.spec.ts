/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer } from './NonDataStubs';
import { StubAccessControlServer, StubCatalogServer, StubOperatorServer } from './StubServer';
/* eslint-enable */

// スタブサーバー
const CatalogServer = new StubCatalogServer();
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/actor';

// リクエストデータ
const data = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000110,
        apiUrl: '/notification',
        apiMethod: 'POST',
        operator: {
            type: 0,
            loginId: 'userId01'
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/catalog/ext/',
        apiMethod: 'POST'
    }
}];
const dataPxrRoot = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/notification',
        apiMethod: 'POST',
        userId: 'userId02',
        operator: {
            type: 2,
            app: {
                _value: '1',
                _ver: 2
            },
            loginId: 'userId01'
        }
    },
    target: {
        blockCode: 1000110,
        apiUrl: '/catalog/ext/',
        apiMethod: 'POST'
    }
}];
const dataWithRole = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/notification',
        apiMethod: 'POST',
        operator: {
            type: 2,
            loginId: 'userId01',
            app: {
                _value: '1',
                _ver: 2
            },
            role: [
                {
                    _value: '1',
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/catalog/ext/',
        apiMethod: 'POST'
    }
}];

const session = encodeURIComponent(JSON.stringify({
    sessionId: '2212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca',
    operatorId: 1,
    type: 3,
    loginId: 'root_member01',
    name: '運営メンバー01',
    mobilePhone: '09011112222',
    auth: { member: { add: true, update: true, delete: true }, actor: { create: true, update: true } },
    lastLoginAt: '2019-10-1814:07:43',
    passwordChangedFlg: false,
    attributes: {},
    roles: [ { _value: 1, _ver: 1 } ],
    block: { _value: 10001, _ver: 1 },
    actor: { _value: 10002, _ver: 1 }
}));

/**
 * アクター操作APIトークン生成指示
 */
describe('Access-Control Manage Service.Create Actor API Key', () => {
    beforeAll(async () => {
        await Application.start();
        await CatalogServer.start();
        await OperatorServer.start();
    });
    afterAll(async () => {
        await Application.stop();
        await CatalogServer.stop();
        await OperatorServer.stop();
    });

    describe('アクター操作APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
        });
        test('正常系: アクター操作APIトークン生成指示', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([{
                apiUrl: 'a',
                apiMethod: 'post',
                apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                userId: 'a',
                expirationDate: response.body[0].expirationDate,
                blockCode: 1000109
            }]));
            expect(response.status).toBe(200);
        });
        test('正常系: アクター操作APIトークン生成指示(PXR-Root)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(dataPxrRoot);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([{
                apiUrl: 'a',
                apiMethod: 'post',
                apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                userId: 'a',
                expirationDate: response.body[0].expirationDate,
                blockCode: 1000110
            }]));
            expect(response.status).toBe(200);
        });
        test('正常系: アクター操作APIトークン生成指示(RoleEntity)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(dataWithRole);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([{
                apiUrl: 'a',
                apiMethod: 'post',
                apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                userId: 'a',
                expirationDate: response.body[0].expirationDate,
                blockCode: 1000109
            }]));
            expect(response.status).toBe(200);
        });
        test('異常系: アクター操作APIトークン生成指示(ブロックカタログではないNS)', async () => {
            data[0].caller.blockCode = 1000000;
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'このコードは、ブロックのものではありません(コード値: 1000000)' }));
            expect(response.status).toBe(400);
        });
        test('異常系: アクター操作APIトークン生成指示(ブロックカタログとしては期待しない形式)', async () => {
            data[0].caller.blockCode = 1000114;
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'このコードは、ブロックのものではありません(コード値: 1000114)' }));
            expect(response.status).toBe(400);
        });
    });
    describe('アクター操作APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await NonData_AccessControlServer.start();
        });
        afterAll(async () => {
            await NonData_AccessControlServer.stop();
        });
        test('正常系: アクター操作APIトークン生成指示(空)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(dataWithRole);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({}));
            expect(response.status).toBe(204);
        });
    });
});
