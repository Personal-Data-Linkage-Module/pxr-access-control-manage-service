/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer, EmptyResponseStubBookManageServer, EmptyResponseStubCTokenLedgerServer } from './NonDataStubs';
import { StubCatalogServer, StubAccessControlServer, StubOperatorServer, StubBookManageServer, StubCTokenLedgerServer, StubBookManageServer1, StubIdServiceServer } from './StubServer';
import { WrongDataStubAccessControlServer, WrongDataStubBookManageServer, WrongDataStubCTokenLedgerServer } from './WrongDataStubs';
/* eslint-enable */

// スタブサーバー
let CatalogServer: StubCatalogServer = null;
let IdServiceServer: StubIdServiceServer = null;
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
const BookManageServer = new StubBookManageServer();
const BookManageServer1 = new StubBookManageServer1();
const CTokenLedgerServer = new StubCTokenLedgerServer();
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();
const NonData_BookManageServer_SearchAPI = new EmptyResponseStubBookManageServer('/book-manage/search/user');
const NonData_BookManageServer_SettingSharingAPI = new EmptyResponseStubBookManageServer('/book-manage/settings/share');
const NonData_CTokenLedgerServer = new EmptyResponseStubCTokenLedgerServer();
// 異常なデータ型でのレスポンス
const WrongData_AccessControlServer = new WrongDataStubAccessControlServer();
const WrongData_BookManageServer_SearchAPI = new WrongDataStubBookManageServer('/book-manage/search/user');
const WrongData_BookManageServer_SettingSharingAPI = new WrongDataStubBookManageServer('/book-manage/settings/share');
const WrongData_CTokenLedgerServer = new WrongDataStubCTokenLedgerServer();

// アプリケーション
const expressApp = Application.express.app;
const baseURI = '/access-control-manage/share/continuous';

// リクエストデータ
const wfSuccessfullyData = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
const wfSuccessfullyData1 = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1999999,
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
                document: [
                    {
                        _value: 1000999,
                        _ver: 1
                    }
                ],
                thing: [
                    {
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000020,
                    _ver: 1
                }
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000120,
                    _ver: 1
                }
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000121,
                    _ver: 1
                }
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000122,
                    _ver: 1
                }
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000123,
                    _ver: 1
                }
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData7 = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000124,
                    _ver: 1
                }
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfSuccessfullyData8= [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000125,
                    _ver: 1
                }
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
const nonArrayData = {
    caller: {
        apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
        blockCode: 1000109,
        apiUrl: '/book-operate/share',
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
            userId: 'xxx_yyy.wf1',
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
};
const callerOperatorIsNotAllowed = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
            apiMethod: 'POST',
            operator: {
                type: 0,
                loginId: 'member01'
            },
            requestBody: {
                userId: 'xxx_yyy.wf1',
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
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
const notAllowedDataSharingRequest = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
const notExistsBooksOfUserId = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf2',
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
const wfErrorData1 = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
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
                        _value: 1000010,
                        _ver: 1
                    }
                ],
                actor: {
                    _value: 1000125,
                    _ver: 1
                }
            }
        },
        target: {
            apiUrl: '/book-operate/share/search',
            apiMethod: 'POST'
        }
    }
];
const wfDestCheckAccessToken = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
                dest: {
                    app: 1000007,
                    actor: 10002
                },
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

const appDest = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
                dest: {
                    app: 1000007,
                    actor: 10002
                },
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

const notRequireConsentData = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
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
                userId: 'xxx_yyy.wf1',
                event: [
                    {
                        _value: 1001027,
                        _ver: 7
                    }
                ],
                thing: [
                    {
                        _value: 1001026,
                        _ver: 4
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
 * 継続的データ共有APIトークン生成指示
 */
describe('Access-Control Manage Service.Create the sharing continuous API key', () => {
    beforeAll(async () => {
        await Application.start();
        await OperatorServer.start();
    });
    afterAll(async () => {
        await Application.stop();
        await OperatorServer.stop();
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

    describe('継続的データ共有APIトークン生成指示 バリデーション POST: ' + baseURI, () => {
        test('配列ではない形式', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                })
                .send(nonArrayData);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストが配列ではありません' }));
            expect(response.status).toBe(400);
        });
        test('呼出元がアプリケーションではない', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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

    describe('継続的データ共有APIトークン生成指示 正常系 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
            await BookManageServer.start();
            await CTokenLedgerServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await BookManageServer.stop();
            await CTokenLedgerServer.stop();
        });
        test('正常パターン 呼び出しオペレーターがアプリケーション, データ共有定義カタログが削除済み', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
        test('正常パターン 呼び出しオペレーターがアプリケーション', async () => {
            CatalogServer = new StubCatalogServer(false, 'no-restriction');
            await CatalogServer.start();
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
        test('正常パターン 共有元指定', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
        test('正常パターン 共有先制限 禁止されていないRegion', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
        test('正常パターン 共有先制限 禁止されていないサービス', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
        test('正常パターン 共有先制限 許可されているRegion', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
        test('正常パターン 共有先制限 許可されているサービス', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData6);

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
        test('正常パターン 共有先制限カタログがない', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData7);

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
        test('正常パターン アプリケーション、destあり、アクセストークン検証：要', async () => {
            // BookManageService.getUserInfoOnlyOneで配列型のレスポンスからpxrIdを取れないためエラーになる。
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
                .send(wfDestCheckAccessToken);

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

        test('正常パターン アプリケーション、destがAPP', async () => {
            // BookManageService.getUserInfoOnlyOneで配列型のレスポンスからpxrIdを取れないためエラーになる。
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
                .send(appDest);
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
        test('正常：アプリケーション、同意不要のデータ種', async () => {
            CatalogServer = new StubCatalogServer(false, 'no-restriction');
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(notRequireConsentData);
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
    });

    describe('継続的データ共有APIトークン生成指示 異常系 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
            await BookManageServer.start();
            await CTokenLedgerServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await BookManageServer.stop();
            await CTokenLedgerServer.stop();
        });
        test('異常パターン 許可されていないデータ種の共有許可リクエスト', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(notAllowedDataSharingRequest);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: 'いずれの状態共有機能定義においても、リクエストされたデータ種を共有できるように許可されていません'
            }));
            expect(response.status).toBe(400);
        });
        test('異常パターン 連携先としてリクエスト.利用者IDが設定されたPXRユーザーが存在しない', async () => {
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(notExistsBooksOfUserId);

            // expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '対象の利用者へ連携が定義されたPXR-IDは存在しません' }));
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'Book管理サービス.My-Condition-Book一覧が0件でした' }));
            expect(response.status).toBe(400);
        });
        test('異常パターン 共有先制限 許可されていないRegion', async () => {
            wfSuccessfullyData5[0].caller.requestBody.actor._value = 1000130;
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData5);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: '共有先制限定義により、リクエストされたデータ種を共有できるように許可されていません'
            }));
            expect(response.status).toBe(400);
        });
        test('異常パターン 共有先制限 許可されていないサービス', async () => {
            wfSuccessfullyData6[0].caller.requestBody.actor._value = 1000131;
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData6);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: '共有先制限定義により、リクエストされたデータ種を共有できるように許可されていません'
            }));
            expect(response.status).toBe(400);
        });
        test('異常パターン 共有先制限 禁止されているRegion', async () => {
            wfSuccessfullyData5[0].caller.requestBody.actor._value = 1000132;
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData5);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: '共有先制限定義により、リクエストされたデータ種を共有できるように許可されていません'
            }));
            expect(response.status).toBe(400);
        });
        test('異常パターン 共有先制限 禁止されているサービス', async () => {
            wfSuccessfullyData6[0].caller.requestBody.actor._value = 1000133;
            CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                .post(baseURI)
                .set({
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                })
                .send(wfSuccessfullyData6);

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: '共有先制限定義により、リクエストされたデータ種を共有できるように許可されていません'
            }));
            expect(response.status).toBe(400);
        });
    });

    describe('継続的データ共有APIトークン生成指示 連携サービスからのレスポンスが空 POST: ' + baseURI, () => {
        describe('アクセス制御サービス', () => {
            beforeAll(async () => {
                await NonData_AccessControlServer.start()
                await BookManageServer.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await NonData_AccessControlServer.stop();
                await BookManageServer.stop();
                await CTokenLedgerServer.stop();
            });
            test('アクセス制御サービスからのレスポンスが空', async () => {
                CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
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
        describe('Book管理サービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await CTokenLedgerServer.stop();
            });
            describe('Book一覧検索API', () => {
                beforeAll(async () => {
                    await NonData_BookManageServer_SearchAPI.start();
                });
                afterAll(async () => {
                    await NonData_BookManageServer_SearchAPI.stop();
                });
                test('レスポンスが空', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'Book管理サービス.My-Condition-Book一覧が0件でした' }));
                    expect(response.status).toBe(400);
                });
            });
            describe('共有定義取得API', () => {
                beforeAll(async () => {
                    await NonData_BookManageServer_SettingSharingAPI.start();
                });
                afterAll(async () => {
                    await NonData_BookManageServer_SettingSharingAPI.stop();
                });
                test('レスポンスが空', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'Book管理サービス.データ共有定義取得が0件でした' }));
                    expect(response.status).toBe(400);
                });
            });
        });
        describe('C Token台帳サービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await BookManageServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await BookManageServer.stop();
            });
            describe('件数取得API', () => {
                beforeAll(async () => {
                    await NonData_CTokenLedgerServer.start();
                });
                afterAll(async () => {
                    await NonData_CTokenLedgerServer.stop();
                });
                test('レスポンスが空', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'CToken台帳サービス.件数検索APIの結果が0件でした' }));
                    expect(response.status).toBe(400);
                });
            });
        });
    });

    describe('継続的データ共有APIトークン生成指示 連携サービスからのレスポンスが期待しないデータ型 POST: ' + baseURI, () => {
        describe('アクセス制御サービス', () => {
            beforeAll(async () => {
                await WrongData_AccessControlServer.start();
                await BookManageServer.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await WrongData_AccessControlServer.stop();
                await BookManageServer.stop();
                await CTokenLedgerServer.stop();
            });
            test('アクセス制御サービスからのレスポンスに不足', async () => {
                CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                    .post(baseURI)
                    .set({
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                    })
                    .send(wfSuccessfullyData);
    
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                    status: 500,
                    message: 'アクセス制御サービスのレスポンスを内部処理用へ変換に失敗しました'
                }));
                expect(response.status).toBe(500);
            });
        });
        describe('Book管理サービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await CTokenLedgerServer.stop();
            });
            describe('Book一覧検索API', () => {
                beforeAll(async () => {
                    await WrongData_BookManageServer_SearchAPI.start();
                });
                afterAll(async () => {
                    await WrongData_BookManageServer_SearchAPI.stop();
                });
                test('レスポンスに不足', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                        status: 500,
                        message: 'Book管理サービス.My-Condition-Book一覧の結果を内部処理用に変換することに失敗しました'
                    }));
                    expect(response.status).toBe(500);
                });
            });
            describe('共有定義取得API', () => {
                beforeAll(async () => {
                    await WrongData_BookManageServer_SettingSharingAPI.start();
                });
                afterAll(async () => {
                    await WrongData_BookManageServer_SettingSharingAPI.stop();
                });
                test('レスポンスに不足', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 500, message: 'Book管理サービス.データ共有定義取得の結果を内部処理用に変換することに失敗しました' }));
                    expect(response.status).toBe(500);
                });
            });
        });
        describe('C Token台帳サービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await BookManageServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await BookManageServer.stop();
            });
            describe('件数取得API', () => {
                beforeAll(async () => {
                    await WrongData_CTokenLedgerServer.start();
                });
                afterAll(async () => {
                    await WrongData_CTokenLedgerServer.stop();
                });
                test('レスポンスに不足', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 500, message: 'CToken台帳サービス.件数検索APIの結果を内部処理用の変換に失敗しました' }));
                    expect(response.status).toBe(500);
                });
            });
        });
        describe('カタログサービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await BookManageServer1.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await BookManageServer1.stop();
                await CTokenLedgerServer.stop();
            });
            describe('カタログ取得API', () => {
                test('状態共有機能カタログ取得のレスポンスに不足', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                        status: 500,
                        message: 'カタログサービスにて取得したカタログを状態共有機能への変換に失敗しました(コード値: 1000394)'
                    }));
                    expect(response.status).toBe(500);
                });
            });
        });
        describe('カタログサービス2', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await BookManageServer.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await BookManageServer.stop();
                await CTokenLedgerServer.stop();
            });
            describe('カタログ取得API', () => {
                test('共有先制限定義カタログ取得のレスポンスに不足', async () => {
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData8);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                        status: 500,
                        message: 'カタログサービスにて取得したカタログを共有先制限定義への変換に失敗しました(ネームスペース: catalog/ext/test-org/actor/app/actor_1000125/sharing-restriction)'
                    }));
                    expect(response.status).toBe(500);
                });
            });
        });
        describe('データ共有サービス', () => {
            beforeAll(async () => {
                await AccessControlServer.start();
                await BookManageServer.start();
                await CTokenLedgerServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await BookManageServer.stop();
                await CTokenLedgerServer.stop();
            });
            describe('共有先制限チェックAPI', () => {
                test('共有先制限定義 許可リストと禁止リストが両方設定されている(document)', async () => {
                    wfSuccessfullyData8[0].caller.requestBody.actor._value = 1000126;
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData8);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                        status: 400,
                        message: '共有先制限定義の許可リストと禁止リストが同時に定義されています'
                    }));
                    expect(response.status).toBe(400);
                });
            });
            describe('共有先制限チェックAPI', () => {
                test('共有先制限定義 許可リストと禁止リストが両方設定されている(event)', async () => {
                    wfSuccessfullyData8[0].caller.requestBody.actor._value = 1000127;
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData8);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                        status: 400,
                        message: '共有先制限定義の許可リストと禁止リストが同時に定義されています'
                    }));
                    expect(response.status).toBe(400);
                });
            });
            describe('共有先制限チェックAPI', () => {
                test('共有先制限定義 許可リストと禁止リストが両方設定されている(thing)', async () => {
                    wfSuccessfullyData8[0].caller.requestBody.actor._value = 1000128;
                    CatalogServer = new StubCatalogServer();
            await CatalogServer.start();
            const response = await supertest(expressApp)
                        .post(baseURI)
                        .set({
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A10002%2C%22_ver%22%3A1%7D%7D'
                        })
                        .send(wfSuccessfullyData8);
        
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                        status: 400,
                        message: '共有先制限定義の許可リストと禁止リストが同時に定義されています'
                    }));
                    expect(response.status).toBe(400);
                });
            });
        });
    });
});
