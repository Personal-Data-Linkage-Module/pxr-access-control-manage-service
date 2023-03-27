/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import Config from '../common/Config';
import { EmptyResponseStubAccessControlServer } from './NonDataStubs';
import { StubCatalogServer, StubAccessControlServer, StubOperatorServer, StubBookManageServer, StubIdServiceServer } from './StubServer';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

// スタブサーバー
let CatalogServer: StubCatalogServer = null;
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
const BookManageServer = new StubBookManageServer();
let IdServiceServer: StubIdServiceServer = null;
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/store';

// リクエストデータ
const dataAppDocument = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114,
                            _ver: 1
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000500,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataAppThing = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/thing/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000014,
                    _ver: 1
                },
                userId: {
                    value: 'xxx_yyy'
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/thing/{userId}',
        apiMethod: 'POST'
    }
}];
const dataAppThinId = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/thing/{userId}',
        apiMethod: 'POST',
        userId: '_user_id',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000014,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000000,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/thing/{userId}',
        apiMethod: 'POST'
    }
}];
const dataAppId = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'id_user_',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000014,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'app01',
            app: {
                _value: 1000007,
                _ver: 1
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataApp = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000014,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'app01',
            app: {
                _value: 1000007,
                _ver: 1
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataAppToken = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000115
                        }
                    },
                    app: {
                        value: {
                            _value: 1000009,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000009,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'app01',
            app: {
                _value: 1000007,
                _ver: 1
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataNoUserId = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/thing/{userId}',
        apiMethod: 'POST',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000014,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/thing/{userId}',
        apiMethod: 'POST'
    }
}];
const dataNoTarget: any[] = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'id_user_',
        requestBody: [],
        operator: {
            type: 2,
            loginId: 'app01',
            app: {
                _value: 1000007,
                _ver: 1
            }
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataMismatchPxrId = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy.dummy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000116
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000009,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataMismatchWfCode = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 2000009,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000009,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataMismatchUserId = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000009,
                    _ver: 1
                },
                userId: {
                    value: 'taro_yamadummy'
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'POST'
    }
}];
const dataDelete = [{
    caller: {
        apiCode: 'a9cf3da0-5f6e-46c7-b913-0227482abebc',
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'DELETE',
        userId: 'xxx_yyy',
        requestBody: [
            {
                app: {
                    code: {
                        value: {
                            _value: 1000114
                        }
                    },
                    app: {
                        value: {
                            _value: 1000010,
                            _ver: 1
                        }
                    }
                },
                code: {
                    _value: 1000009,
                    _ver: 1
                }
            }
        ],
        operator: {
            type: 2,
            loginId: 'wf_staff01',
            app: {
                _value: 1000007,
                _ver: 1
            },
            role: [
                {
                    _value: 1000005,
                    _ver: 1
                }
            ]
        }
    },
    target: {
        blockCode: 1000109,
        apiUrl: '/book-operate/event/{userId}',
        apiMethod: 'DELETE'
    }
}];

/**
 * データ蓄積APIトークン生成指示
 */
describe('Access-Control Manage Service.Create store API Key', () => {
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

    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (CatalogServer) {
            await CatalogServer.stop();
            CatalogServer = null;
        }
        if (IdServiceServer) {
            await IdServiceServer.stop();
            IdServiceServer = null;
        }
    });

    describe('データ蓄積APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
        });
        test('正常系: データ蓄積APIトークン生成指示(APP, ドキュメント)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataAppDocument);

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
        test('正常系: データ蓄積APIトークン生成指示(APP, モノ, 削除)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataDelete);

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
        test('正常系: データ蓄積APIトークン生成指示(APP, モノ) ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

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
        test('正常系: データ蓄積APIトークン生成指示(APP, thing)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataAppThing);

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
        test('正常系: データ蓄積APIトークン生成指示(APP, モノ)、アクセストークン検証要否判定：要', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true);
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    'access-token': 'access-token',
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

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
        test('正常系: データ蓄積APIトークン生成指示(APP, モノ)、アクセストークン検証要否カタログがない', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true, 'no-verify');
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    'access-token': 'access-token',
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

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
        test('正常系: データ蓄積APIトークン生成指示(APP, モノ)、アクセストークン検証要否判定：否', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true);
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

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
        test('異常系: データ蓄積APIトークン生成指示(APP, モノ)、アクセストークン検証要否カタログ取得でエラー', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true, 'error-verify');
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    'access-token': 'access-token',
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: sprintf(Message.RESPONSE_IS_NO_DATE, 'catalog') }));
            expect(response.status).toBe(400);
        });
        test('異常系: データ蓄積APIトークン生成指示(UserIdがない)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataNoUserId);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '利用者IDの指定が必要です' }));
            expect(response.status).toBe(400);
        });
        test('異常系: データ蓄積APIトークン生成指示(定義が存在しない)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataAppId);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 401, message: '指定されたデータ種はデータ蓄積定義に設定されていません' }));
            expect(response.status).toBe(401);
        });
        test('異常系: データ蓄積APIトークン生成指示(定義とコードが一致しない)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataAppThinId);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 401, message: '指定されたデータ種はデータ蓄積定義に設定されていません' }));
            expect(response.status).toBe(401);
        });
        test('異常系: データ蓄積APIトークン生成指示(リクエストに対象コードがない)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            dataNoTarget[0].target._code = [];
            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataNoTarget);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'データ種コード配列が取得できませんでした' }));
            expect(response.status).toBe(400);
        });
        test('異常系: アクセストークン検証、アクセストークン取得失敗', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true);
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application_token'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataAppToken);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.NOT_EXIST_ACCESS_TOKEN }));
                expect(response.status).toBe(400);
        });
        test('異常系: アクセストークン検証、IDコネクトから取得したPXR-ID不一致', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true);
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application_no_pxr_id'])
                .set({
                    'access-token': 'access-token',
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataMismatchPxrId);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.INVALID_ACCESS_TOKEN }));
                expect(response.status).toBe(400);
        });
        test('異常系：蓄積データの妥当性チェック、アクターコード,appのコードいずれかの不一致', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataMismatchWfCode);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.NOT_EQUAL_ACTOR_SERVICE_CODE }));
                expect(response.status).toBe(400);
        });
        test('異常系：蓄積データの妥当性チェック、パスパラメーターの利用者IDと蓄積データの個人識別子が一致しない', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataMismatchUserId);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.NOT_EQUAL_USER_ID }));
                expect(response.status).toBe(400);
        });

        test('異常系: データ蓄積APIトークン生成指示(Regionに参加していないAPP) ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application_no_region'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.NOT_JOIN_REGION }));
            expect(response.status).toBe(400);
        });
        test('異常系: データ蓄積APIトークン生成指示(Regionに参加していないAPP) ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application_not_join_region'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.NOT_JOIN_REGION }));
            expect(response.status).toBe(400);
        });
    });
    describe('データ蓄積APIトークン生成指示 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await NonData_AccessControlServer.start();
        });
        afterAll(async () => {
            await NonData_AccessControlServer.stop();
        });
        test('正常系: データ蓄積APIトークン生成指示(空)', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200,200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set('Cookie', ['operator_type2_session=application'])
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                })
                .send(dataApp);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({}));
            expect(response.status).toBe(204);
        });
    });
});
