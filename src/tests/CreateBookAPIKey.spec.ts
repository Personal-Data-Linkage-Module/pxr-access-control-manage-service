/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer, EmptyResponseStubCatalogServerNsSearch } from './NonDataStubs';
import { StubAccessControlServer, StubBookManageServer1, StubBookManageServer2, StubCatalogServer, StubOperatorServer } from './StubServer';
import { WrongDataStubCatalogServerNsSearch } from './WrongDataStubs';
/* eslint-enable */

// スタブサーバー
const CatalogServer = new StubCatalogServer();
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
const BookManageServer = new StubBookManageServer1();
const BookManageServer2 = new StubBookManageServer2();
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();
const NonData_CatalogServer_NsSearch = new EmptyResponseStubCatalogServerNsSearch();
// レスポンスに不備
const WrongData_CatalogServer_NsSearch = new WrongDataStubCatalogServerNsSearch();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/book';

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
        apiUrl: '/book-manage',
        apiMethod: 'POST'
    }
}];
const dataNoArray = [{
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
        apiMethod: 'POST'
    }
}];
const dataInfoAccount = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000110,
        apiUrl: '/info-account-manage',
        apiMethod: 'POST',
        operator: {
            type: 0,
            loginId: 'userId01'
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-manage',
        apiMethod: 'POST'
    }
}];
const dataInd = [{
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
        apiUrl: '/book-manage/',
        apiMethod: 'POST'
    }
}];
const dataInd2 = [{
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
        apiUrl: '/book-manage',
        apiMethod: 'POST'
    }
}];
/**
 * Book操作時トークン生成指示API
 */
describe('Access-Control Manage Service.Create Book API Key', () => {
    beforeAll(async () => {
        await Application.start();
        await OperatorServer.start();
        await BookManageServer.start();
    });
    afterAll(async () => {
        await Application.stop();
        await OperatorServer.stop();
        await BookManageServer.stop();
    });

    describe('Book操作時トークン生成指示API 正常系 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
            await CatalogServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await CatalogServer.stop();
        });
        test('正常系: Book操作時トークン生成指示API', async () => {
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
        test('正常系: Book操作時トークン生成指示API /book-manage/ 呼び出し', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=ind'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataInd);
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
        test('異常系: Book操作時トークン生成指示API Bookのステータスが 0 以外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=ind'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataInd2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 500, message: 'Bookステータスが0以外のため、このAPIは許可されません' }));
            expect(response.status).toBe(500);
        });
        test('異常系: Book操作時トークン生成指示API(権限がない)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=noauth'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 401, message: '指定されたAPIとメソッドの組み合わせは、あなたの操作権だと許可されません' }));
            expect(response.status).toBe(401);
        });
        test('異常系: Book操作時トークン生成指示API(パスが設定と一致しない)', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataNoArray);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '宛先として指定されたAPIの権限設定がありません' }));
            expect(response.status).toBe(400);
        });
        test('異常系: Book操作時トークン生成指示API /book-manage/ 呼び出しでエラー', async () => {
            await BookManageServer.stop();
            await BookManageServer2.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=ind'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataInd2);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 500, message: 'Book管理サービス.Book取得に失敗しました' }));
            expect(response.status).toBe(500);
            await BookManageServer2.stop();
        });
        test('異常系: Book操作時トークン生成指示API アクター種別が未サポート', async () => {
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type0_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46aaa'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(data);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '未サポートのアクター種別です' }));
            expect(response.status).toBe(400);
        });
    });
    describe('Book操作時トークン生成指示API 連携サービスからのレスポンスが空 POST: ' + baseURI, () => {
        describe('アクセス制御サービス', () => {
            beforeAll(async () => {
                await NonData_AccessControlServer.start();
                await CatalogServer.start();
            });
            afterAll(async () => {
                await NonData_AccessControlServer.stop();
                await CatalogServer.stop();
            });
            test('レスポンスが空', async () => {
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
        describe('カタログサービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await NonData_CatalogServer_NsSearch.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await NonData_CatalogServer_NsSearch.stop();
            });
        });
    });
    describe('Book操作時トークン生成指示API 連携サービスからのレスポンスが期待しないデータ型 POST: ' + baseURI, () => {
        describe('カタログサービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await WrongData_CatalogServer_NsSearch.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await WrongData_CatalogServer_NsSearch.stop();
            });
        });
    });
    describe('Book操作時トークン生成指示API 連携サービスが停止 POST: ' + baseURI, () => {
        describe('カタログサービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
            });
            test('サービスが停止', async () => {
                const response = await supertest(expressApp)
                    .post(baseURI)
                    .set('Cookie', ['operator_type0_session=cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc'])
                    .set({
                        accept: 'application/json',
                        'Content-Type': 'application/json'
                    })
                    .send(data);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 503, message: '連携サービスとの接続に失敗しました(連携サービス名: catalog)' }));
                expect(response.status).toBe(503);
            });
        });
    });
});
