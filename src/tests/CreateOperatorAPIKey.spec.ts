/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer } from './NonDataStubs';
import { StubCatalogServer, StubAccessControlServer, StubOperatorServer } from './StubServer';
/* eslint-enable */

// スタブサーバー
const CatalogServer = new StubCatalogServer();
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/operator';

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
        apiUrl: '/operator',
        apiMethod: 'POST'
    }
}];
const data1 = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000110,
        apiUrl: '/notification',
        apiMethod: 'POST',
        operator: {
            type: 0,
            loginId: 'userId01'
        },
        requestBody: {
            member: {
                create: true,
                update: true,
                delete: true
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/operator',
        apiMethod: 'POST'
    }
}];
const data2 = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000110,
        apiUrl: '/notification',
        apiMethod: 'POST',
        operator: {
            type: 0,
            loginId: 'userId01'
        },
        requestBody: {
            member: {
                add: true,
                update: true,
                delete: true
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/operator',
        apiMethod: 'POST'
    }
}];
const data3 = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000110,
        apiUrl: '/notification',
        apiMethod: 'POST',
        operator: {
            type: 0,
            loginId: 'userId01'
        },
        requestBody: {
            not_exists: {
                add: true,
                update: true,
                delete: true
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/operator',
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
    block: { _value: 1000109, _ver: 1 },
    actor: { _value: 1000020, _ver: 1 }
}));
const session1 = encodeURIComponent(JSON.stringify({
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
    block: { _value: 1000109, _ver: 1 }
}));
const session2 = encodeURIComponent(JSON.stringify({
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
    block: { _value: 1000129, _ver: 1 }
}));

/**
 * オペレーター操作用APIトークン生成指示
 */
describe('Access-Control Manage Service.Create Operator API Key', () => {
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

    describe('オペレーター操作用APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
        });
        test('正常系: オペレーター操作用APIトークン生成指示', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc'])
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
        test('異常系: requestBodyに設定された操作権がカタログの定義に存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(data1);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                { status: 401, message: '指定されたAPIとメソッドの組み合わせは、あなたの操作権だと許可されません' }
            ));
            expect(response.status).toBe(401);
        });
        test('正常系: オペレーター操作用APIトークン生成指示', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(data2);

            expect(response.status).toBe(200);
        });
        test('異常系: カタログ上、グルーピングされていない権限名', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session
                })
                .send(data3);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                { status: 401, message: '指定されたAPIとメソッドの組み合わせは、あなたの操作権だと許可されません' }
            ));
            expect(response.status).toBe(401);
        });
        test('異常系: 存在した権限であっても、アクター設定上は許可されていない設定権限', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session1
                })
                .send(data2);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                { status: 401, message: '指定されたAPIとメソッドの組み合わせは、あなたの操作権だと許可されません' }
            ));
            expect(response.status).toBe(401);
        });
        test('異常系: アクター設定定義が存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: session2
                })
                .send(data2);

            expect(JSON.stringify({
                status: 400,
                message: 'アクター個別設定の取得に失敗しました(ネームスペース: catalog/model/setting/actor/pxr-root)'
            }));
            expect(response.status).toBe(400);
        });
    });
    describe('オペレーター操作用APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await NonData_AccessControlServer.start();
        });
        afterAll(async () => {
            await NonData_AccessControlServer.stop();
        });
        test('正常系: オペレーター操作用APIトークン生成指示(空)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({}));
            expect(response.status).toBe(204);
        });
    });
});
