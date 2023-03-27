/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer } from './NonDataStubs';
import { StubCatalogServer, StubAccessControlServer, StubOperatorServer, StubBookManageServer, StubCTokenLedgerServer, StubCTokenLedgerServer1, StubCTokenLedgerServer2, StubIdServiceServer, StubCTokenLedgerServer3 } from './StubServer';
/* eslint-enable */

// スタブサーバー
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
const BookManageServer = new StubBookManageServer();
const CTokenLedgerServer = new StubCTokenLedgerServer();
const CTokenLedgerServer1 = new StubCTokenLedgerServer1();
const CTokenLedgerServer2 = new StubCTokenLedgerServer2();
const CTokenLedgerServer3 = new StubCTokenLedgerServer3();
let CatalogServer: StubCatalogServer = null;
let IdServiceServer: StubIdServiceServer = null;
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/share/temp';

// リクエストデータ
const wfSuccessfullyData = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dcc',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000011,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyDataDoc = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dcc',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData1 = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc2',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData2 = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc3',
                event: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData3 = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc4',
                thing: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const appSuccessfullyData = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000008,
                    _ver: 2
                },
                role: [
                    {
                        _value: 1,
                        _ver: 2
                    }
                ],
                loginId: 'app_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dcc',
                event: [
                    {
                        _value: 1000008,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000011,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const callerOperatorIsNotAllowed = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 0,
                loginId: 'member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dcc',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                event: [
                    {
                        _value: 1000008,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000011,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const requestBodyIsAlmostEmpty = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: '1',
                    _ver: 2
                },
                loginId: 'app_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dcc',
                document: [] as any,
                event: [] as any,
                thing: [] as any
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyDataNonAllowTo = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dcc',
                document: [
                    {
                        _value: 9000999,
                        _ver: 1
                    }
                ],
                event: [
                    {
                        _value: 9000008,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 9000011,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyDataNotPermitted = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc0',
                document: [
                    {
                        _value: 9000999,
                        _ver: 1
                    }
                ],
                event: [
                    {
                        _value: 9000008,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 9000011,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyDataWrongResponseFromBookManage = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc1',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000011,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData4 = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc5',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                event: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData5 = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc6',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                event: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData6 = [
    {
        caller: {
            apiCode: '973698b5-72dc-4d61-a044-bb84cace4b80',
            blockCode: 1000109,
            apiUrl: '/book-operate/share/temp',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                role: [
                    {
                        _value: 1000005,
                        _ver: 1
                    }
                ],
                loginId: 'wf_member01'
            },
            requestBody: {
                tempShareCode: 'f9d540e6-8e39-423e-8eac-cd5063e37dc7',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                event: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ]
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];

/**
 * 一時的データ共有APIトークン生成指示
 */
describe('Access-Control Manage Service.Create share the temporary API Key', () => {
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

    describe('一時的データ共有APIトークン生成指示 バリデーション POST: ' + baseURI, () => {
        test('呼出元がアプリケーションではない', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                })
                .send(callerOperatorIsNotAllowed);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '呼び出しオペレーターは、アプリケーションのみ許可されています' }));
            expect(response.status).toBe(400);
        })
        test('document, event, thingのいずれも設定されていない', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                })
                .send(requestBodyIsAlmostEmpty);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: 'caller.requestBodyにdocument, event, thingのうちいずれも設定されていません'
            }));
            expect(response.status).toBe(400);
        })
    });

    describe('一時的データ共有APIトークン生成指示 正常系 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
            await CTokenLedgerServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await CTokenLedgerServer.stop();
        });
        test('正常パターン アプリケーション、ドキュメント+モノ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン アプリケーション、ドキュメント', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyDataDoc);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン アプリケーション、識別子指定、ドキュメントのみ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData1);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン アプリケーション、識別子指定、イベントのみ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData2);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン アプリケーション、識別子指定、モノのみ', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData3);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン アプリケーション、識別子指定、ドキュメント、イベント(配列)、モノ全て', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData4);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン アプリケーション、識別子指定、ドキュメント、イベント、モノ全て', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData5);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('正常パターン 呼び出しオペレーターがアプリケーション', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(appSuccessfullyData);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[0].expirationDate,
                    blockCode: 1000109
                }
            ]));
            expect(response.status).toBe(200);
        });
        test('異常：アプリケーション、アクセストークン検証要否判定：要', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer(true);
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    'access-token': 'access-token',
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(appSuccessfullyData);

            expect(response.status).toBe(400);
        });
    });

    describe('一時的データ共有APIトークン生成指示 異常系 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
            await CTokenLedgerServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await CTokenLedgerServer.stop();
        });
        test('異常パターン 許可されていないデータ種の共有リクエスト', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyDataNonAllowTo);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストされたデータ種を共有できるように許可されていません' }));
            expect(response.status).toBe(400);
        });
        test('異常パターン Book管理サービス.一時的データ共有コード照合にて、document, event, thingが空の共有について', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyDataNotPermitted);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストされたデータ種を共有できるように許可されていません' }));
            expect(response.status).toBe(400);
        });
        test('異常パターン アプリケーション、識別子指定、ドキュメント、イベント、モノ全て', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData6);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストされたデータ種を共有できるように許可されていません' }));
                expect(response.status).toBe(400);
        });
        test('異常パターン アプリケーション、識別子指定、ドキュメント、イベント、モノ全て', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData6);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストされたデータ種を共有できるように許可されていません' }));
                expect(response.status).toBe(400);
        });
        test('異常パターン アプリケーション、識別子指定、ドキュメント、イベント、モノ全て', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();
            await CTokenLedgerServer.stop();
            await CTokenLedgerServer3.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData5);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストされたデータ種を共有できるように許可されていません' }));
                expect(response.status).toBe(400);

                await CTokenLedgerServer3.stop();
        });
    });

    describe('一時的データ共有APIトークン生成指示 連携サービスからのレスポンスが空 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await NonData_AccessControlServer.start()
            await CTokenLedgerServer.start();
        });
        afterAll(async () => {
            await NonData_AccessControlServer.stop();
            await CTokenLedgerServer.stop();
        });
        test('アクセス制御サービスからのレスポンスが空', async () => {
            // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData);

            expect(response.status).toBe(204);
        });
    });

    describe('一時的データ共有APIトークン生成指示 連携サービスからのレスポンスが期待しないデータ型 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
        });
        describe('Book管理サービス.一時的データ共有コード照合API', () => {
            beforeAll(async () => {
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await CTokenLedgerServer.stop();
            });
            test('レスポンスに不足', async () => {
                // スタブサーバー起動
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            IdServiceServer = new StubIdServiceServer(200, 200);
            await IdServiceServer.start();

                const response = await supertest(expressApp)
                    .post(baseURI)
                    .set({
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                    })
                    .send(wfSuccessfullyDataWrongResponseFromBookManage);
    
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                    status: 500,
                    message: 'Book管理サービス.一時的データ共有コード照合APIの結果を内部処理用に変換することに失敗しました'
                }));
                expect(response.status).toBe(500);
            });
        });
        describe('カタログサービス.カタログ取得API', () => {
            describe('アクターカタログの取得', () => {
                beforeAll(async () => {
                    await CTokenLedgerServer1.start();
                });
                afterAll(async () => {
                    await CTokenLedgerServer1.stop();
                });
                test('レスポンスに不足', async () => {
                    // スタブサーバー起動
                    CatalogServer = new StubCatalogServer();
                    await CatalogServer.start();
                    IdServiceServer = new StubIdServiceServer(200, 200);
                    await IdServiceServer.start();

                    const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 500, message: 'このコードは、アクターのカタログではありません(コード値: 1000040)' }));
                    expect(response.status).toBe(500);
                });
            });
            describe('ブロックカタログの取得', () => {
                beforeAll(async () => {
                    await CTokenLedgerServer2.start();
                });
                afterAll(async () => {
                    await CTokenLedgerServer2.stop();
                });
                test('レスポンスに不足', async () => {
                    // スタブサーバー起動
                    CatalogServer = new StubCatalogServer();
                    await CatalogServer.start();
                    IdServiceServer = new StubIdServiceServer(200, 200);
                    await IdServiceServer.start();

                    const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'このコードは、ブロックのものではありません(コード値: 1000129)' }));
                    expect(response.status).toBe(400);
                });
            });
        });
    });
});
