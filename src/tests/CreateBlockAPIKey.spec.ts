/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer } from './NonDataStubs';
import { StubAccessControlServer, StubBookManageServer, StubCatalogServer, StubOperatorServer } from './StubServer';
/* eslint-enable */

// スタブサーバー
const CatalogServer = new StubCatalogServer();
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
const BookManageServer = new StubBookManageServer();
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/block';

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
        apiUrl: '/notification',
        apiMethod: 'GET'
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
        apiUrl: '/notification',
        apiMethod: 'GET'
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
        apiUrl: '/notification',
        apiMethod: 'GET'
    }
}];

/**
 * Block間APIトークン生成指示
 */
describe('Access-Control Manage Service.Create Block API Key', () => {
    beforeAll(async () => {
        await Application.start();
        await CatalogServer.start();
        await OperatorServer.start();
        await BookManageServer.start();
    });
    afterAll(async () => {
        await Application.stop();
        await CatalogServer.stop();
        await OperatorServer.stop();
        await BookManageServer.stop();
    });

    describe('Block間APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
        });
        test('正常系: Block間APIトークン生成指示', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=ind'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
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
        test('正常系: Block間APIトークン生成指示(PXR-Root)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type3_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
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
        test('正常系: Block間APIトークン生成指示(RoleEntity)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type3_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
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
        test('異常系: Block間APIトークン生成指示(ブロックカタログではないNS)', async () => {
            data[0].caller.blockCode = 1000000;
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'このコードは、ブロックのものではありません(コード値: 1000000)' }));
            expect(response.status).toBe(400);
        });
        test('異常系: Block間APIトークン生成指示(ブロックカタログとしては期待しない形式)', async () => {
            data[0].caller.blockCode = 1000114;
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'このコードは、ブロックのものではありません(コード値: 1000114)' }));
            expect(response.status).toBe(400);
        });
    });
    describe('Block間APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await NonData_AccessControlServer.start();
        });
        afterAll(async () => {
            await NonData_AccessControlServer.stop();
        });
        test('正常系: Block間APIトークン生成指示(空)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=ind'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataWithRole);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({}));
            expect(response.status).toBe(204);
        });
    });
});
