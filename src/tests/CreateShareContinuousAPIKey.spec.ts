/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import Application from '../index';
import { EmptyResponseStubAccessControlServer, EmptyResponseStubBookManageServer, EmptyResponseStubCTokenLedgerServer } from './NonDataStubs';
import { StubCatalogServer, StubAccessControlServer, StubOperatorServer, StubBookManageServer, StubBookManageServer1, StubIdServiceServer } from './StubServer';
import { WrongDataStubAccessControlServer, WrongDataStubBookManageServer, WrongDataStubCatalogServerNsSearch } from './WrongDataStubs';
import Config from '../common/Config';
import IdService from '../services/IdService_Stub';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

// スタブサーバー
let CatalogServer: StubCatalogServer = null;
let IdServiceServer: StubIdServiceServer = null;
const AccessControlServer = new StubAccessControlServer();
const OperatorServer = new StubOperatorServer();
const BookManageServer = new StubBookManageServer();
const BookManageServer1 = new StubBookManageServer1();
// レスポンスが0件系
const NonData_AccessControlServer = new EmptyResponseStubAccessControlServer();
const NonData_BookManageServer_SearchAPI = new EmptyResponseStubBookManageServer('/book-manage/search/user');
const NonData_CTokenLedgerServer = new EmptyResponseStubCTokenLedgerServer();
// 異常なデータ型でのレスポンス
const WrongData_AccessControlServer = new WrongDataStubAccessControlServer();
const WrongData_BookManageServer_SearchAPI = new WrongDataStubBookManageServer('/book-manage/search/user');

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
                userId: 'xxx_yyy.app1',
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

const appWrongSessionData = [
    {
        caller: {
            apiCode: '31b6f6ca-c855-435c-a596-77a0aa4ee30d',
            blockCode: 1000109,
            apiUrl: '/book-operate/share',
            apiMethod: 'POST',
            operator: {
                type: 2,
                app: {
                    _value: 0,
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
const appWfDest = [
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
const appAppDest = [
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
                userId: 'xxx_yyy.app1',
                dest: {
                    app: 1000008,
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
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await BookManageServer.stop();
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
                },
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[1].expirationDate,
                    blockCode: 1001129
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
                },
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[1].expirationDate,
                    blockCode: 1001129
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
                },
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[1].expirationDate,
                    blockCode: 1001129
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
                },
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[1].expirationDate,
                    blockCode: 1001129
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
                },
                {
                    apiUrl: 'a',
                    apiMethod: 'post',
                    apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                    userId: 'a',
                    expirationDate: response.body[1].expirationDate,
                    blockCode: 1001129
                }
            ]));
            expect(response.status).toBe(200);
        });
    });

    describe('継続的データ共有APIトークン生成指示 異常系 POST: ' + baseURI, () => {
        beforeAll(async () => {
            await AccessControlServer.start();
            await BookManageServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await BookManageServer.stop();
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
    });

    describe('継続的データ共有APIトークン生成指示 連携サービスからのレスポンスが空 POST: ' + baseURI, () => {
        describe('アクセス制御サービス', () => {
            beforeAll(async () => {
                await NonData_AccessControlServer.start()
                await BookManageServer.start();
            });
            afterAll(async () => {
                await NonData_AccessControlServer.stop();
                await BookManageServer.stop();
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
            });
            afterAll(async () => {
                await AccessControlServer.stop();
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
        });
    });

    describe('継続的データ共有APIトークン生成指示 連携サービスからのレスポンスが期待しないデータ型 POST: ' + baseURI, () => {
        describe('アクセス制御サービス', () => {
            beforeAll(async () => {
                await WrongData_AccessControlServer.start();
                await BookManageServer.start();
            });
            afterAll(async () => {
                await WrongData_AccessControlServer.stop();
                await BookManageServer.stop();
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
            });
            afterAll(async () => {
                await AccessControlServer.stop();
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
        });
    });

    describe('利用者ID重複対応追加ケース 継続的データ共有APIトークン生成指示 POST:', () => {
        // IdServiceのスタブの戻り値を設定
        IdService.getPxrId = jest.fn().mockReturnValue('pxr_user01');
        describe('正常系 ' + baseURI, () => {
            //DoRequestメソッドのmock化
            const doRequet = require('../common/DoRequest');
            const mockDoRequest = jest.spyOn(doRequet, 'doRequest');
            beforeAll(async () => {
                await AccessControlServer.start();
                await BookManageServer.start();
            });
            afterAll(async () => {
                await AccessControlServer.stop();
                await BookManageServer.stop()
            });
            beforeEach(async () => {
                mockDoRequest.mockClear();
            });
            test('正常: オペレーター: アプリケーション requestBody にAPPが設定されていない', async () => {
                // スタブサーバー起動
                CatalogServer = new StubCatalogServer(true, 'no-restriction');
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
                expect(response.status).toBe(200);
                expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[0].expirationDate,
                        blockCode: 1000109
                    },
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[1].expirationDate,
                        blockCode: 1001129
                    }
                ]));

                // Book管理サービス.ユーザー取得API へのリクエストの確認
                const apiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/search/user/');
                for (const apiInfo of apiInfos) {
                    expect(apiInfo[2]).toBe(JSON.stringify({
                        actor: 10002,
                        app: 1000008,
                        wf: undefined,
                        userId: 'xxx_yyy.app1'
                    }));
                }
            });

            test('正常パターン アプリケーション requestBody にセッションと異なるAPPが設定されている', async () => {
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
                    .send(appWfDest);
                expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[0].expirationDate,
                        blockCode: 1000109
                    },
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[1].expirationDate,
                        blockCode: 1001129
                    }
                ]));
                expect(response.status).toBe(200);

                // Book管理サービス.ユーザー取得API へのリクエストの確認
                const apiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/search/user/');
                for (const apiInfo of apiInfos) {
                    expect(apiInfo[2]).toBe(JSON.stringify({
                        actor: 10002,
                        wf: undefined,
                        app: 1000007,
                        userId: 'xxx_yyy.wf1'
                    }));
                }
            });

            test('正常パターン アプリケーション requestBody にセッションと同じAPPが設定されている', async () => {
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
                    .send(appAppDest);
                expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[0].expirationDate,
                        blockCode: 1000109
                    },
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[1].expirationDate,
                        blockCode: 1001129
                    }
                ]));
                expect(response.status).toBe(200);

                // Book管理サービス.ユーザー取得API へのリクエストの確認
                const apiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/search/user/');
                for (const apiInfo of apiInfos) {
                    expect(apiInfo[2]).toBe(JSON.stringify({
                        actor: 10002,
                        app: 1000008,
                        wf: undefined,
                        userId: 'xxx_yyy.app1'
                    }));
                }
            });
        });
        describe('異常系 ' + baseURI, () => {
            describe('セッション異常 ', () => {
                beforeAll(async () => {
                    await AccessControlServer.start();
                    await BookManageServer.start();
                });
                afterAll(async () => {
                    await AccessControlServer.stop();
                    await BookManageServer.stop();
                });
                test('異常: セッションから app、wf のコードが取得できない オペレーター: アプリケーション', async () => {
                    // スタブサーバー起動
                    CatalogServer = new StubCatalogServer(true, 'no-restriction');
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
                        .send(appWrongSessionData);
    
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: Message.MISSING_APP_WF_CATALOG_CODE }));
                    expect(response.status).toBe(400);
                });
            });
            describe('Book管理サービス.ユーザー取得APIの結果が 0件 ', () => {
                beforeAll(async () => {
                    await AccessControlServer.start();
                    await NonData_BookManageServer_SearchAPI.start();
                });
                afterAll(async () => {
                    await AccessControlServer.stop();
                    await NonData_BookManageServer_SearchAPI.stop();
                });
                test('異常: Book管理サービス.ユーザー取得APIの結果が 0件 オペレーター: アプリケーション', async () => {
                    // スタブサーバー起動
                    CatalogServer = new StubCatalogServer(true, 'no-restriction');
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
    
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'Book管理サービス.My-Condition-Book一覧が0件でした' }));
                    expect(response.status).toBe(400);
                });
            });
        });
    });
    describe('SNS通知バグ対応追加ケース 継続的データ共有APIトークン生成指示 POST:', () => {
        //DoRequestメソッドのmock化
        const doRequest = require('../common/DoRequest');
        const mockDoRequest = jest.spyOn(doRequest, 'doRequest');
        beforeAll(async () => {
            await AccessControlServer.start();
            await BookManageServer.start();
        });
        afterAll(async () => {
            await AccessControlServer.stop();
            await BookManageServer.stop();
            mockDoRequest.mockRestore();
        });
        beforeEach(async () => {
            mockDoRequest.mockClear();
        });
        describe('正常系:', () => {
            test('正常: 共有のリクエストのデータ種がひとつ（共有元が複数）', async () => {
                CatalogServer = new StubCatalogServer(true);
                await CatalogServer.start();
                IdServiceServer= new StubIdServiceServer(200, 200);
                await IdServiceServer.start();
                const response = await supertest(expressApp)
                    .post(baseURI)
                    .set({
                        'access-token': 'access-token',
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A1000114%2C%22_ver%22%3A1%7D%7D'
                    })
                    .send([{
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
                                loginId: 'app_member01'
                            },
                            requestBody: {
                                userId: 'test_user_#7434',
                                document: null,
                                event: [
                                    {
                                        _value: 1000009,
                                        _ver: 1
                                    }
                                ],
                                thing: null
                            }
                        },
                        target: {
                            apiUrl: '/book-operate/share/search',
                            apiMethod: 'POST'
                        }
                    }]);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[0].expirationDate,
                        blockCode: 1000109
                    },
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[1].expirationDate,
                        blockCode: 1001129
                    }
                ]));
                expect(response.status).toBe(200);

                // Book管理サービス.共有可否チェックAPI へのリクエストの確認
                const bookManageApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/setting/share/permission');
                const bookManageRequest = JSON.parse(bookManageApiInfos[0][2] as string);
                expect(bookManageRequest).toMatchObject({                                                                                                                                                                                                                                                                                           
                    userId: 'test_user_#7434',
                    appCode: 1000007,
                    actorCode: 1000114,
                    document: null,
                    event: [
                        {
                            _value: 1000009,
                            _ver: 1
                        }
                    ],
                    thing: null,
                    sourceActor: null,
                    sourceAsset: null
                });

                // アクセス制御サービス.APIトークン生成API へのリクエストの確認
                const accessControlApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3015/access-control');
                // item.target.parameterの確認
                const accessControlRequest1 = JSON.parse(accessControlApiInfos[0][2] as string);
                expect(accessControlRequest1[0].target.parameter).toBe(JSON.stringify(
                    {
                        document: [
                            {
                                _value: 1000500,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000009,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000014,
                                _ver: 1
                            }
                        ]
                    }
                ));
                const accessControlRequest2 = JSON.parse(accessControlApiInfos[1][2] as string);
                // item.target.parameterの確認
                expect(accessControlRequest2[0].target.parameter).toBe(JSON.stringify(
                    {
                        document: [
                            {
                                _value: 1000500,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000009,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000014,
                                _ver: 1
                            },
                            {
                                _value: 1000015,
                                _ver: 1
                            }
                        ]
                    }
                ));
            });
            test('正常: 共有のリクエストのデータ種が複数（共有元が複数）', async () => {
                CatalogServer = new StubCatalogServer(true);
                await CatalogServer.start();
                IdServiceServer= new StubIdServiceServer(200, 200);
                await IdServiceServer.start();
                const response = await supertest(expressApp)
                    .post(baseURI)
                    .set({
                        'access-token': 'access-token',
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A1000114%2C%22_ver%22%3A1%7D%7D'
                    })
                    .send([{
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
                                loginId: 'app_member01'
                            },
                            requestBody: {
                                userId: 'test_user_#7434',
                                document: [
                                    {
                                        _value: 1000500,
                                        _ver: 1
                                    }
                                ],
                                event: [
                                    {
                                        _value: 1000009,
                                        _ver: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _value: 1000014,
                                        _ver: 1
                                    }
                                ]
                            }
                        },
                        target: {
                            apiUrl: '/book-operate/share/search',
                            apiMethod: 'POST'
                        }
                    }]);

                expect(JSON.stringify(response.body)).toBe(JSON.stringify([
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[0].expirationDate,
                        blockCode: 1000109
                    },
                    {
                        apiUrl: 'a',
                        apiMethod: 'post',
                        apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                        userId: 'a',
                        expirationDate: response.body[1].expirationDate,
                        blockCode: 1001129
                    }
                ]));
                expect(response.status).toBe(200);

                // Book管理サービス.共有可否チェックAPI へのリクエストの確認
                const bookManageApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/setting/share/permission');
                const bookManageRequest = JSON.parse(bookManageApiInfos[0][2] as string);
                expect(bookManageRequest).toMatchObject({                                                                                                                                                                                                                                                                                           
                    userId: 'test_user_#7434',
                    appCode: 1000007,
                    actorCode: 1000114,
                    document: [
                        {
                            _value: 1000500,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000009,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000014,
                            _ver: 1
                        }
                    ],
                    sourceActor: null,
                    sourceAsset: null
                });

                // アクセス制御サービス.APIトークン生成API へのリクエストの確認
                const accessControlApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3015/access-control');
                
                const accessControlRequest1 = JSON.parse(accessControlApiInfos[0][2] as string);
                expect(accessControlRequest1[0].target.parameter).toBe(JSON.stringify(
                    {
                        document: [
                            {
                                _value: 1000500,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000009,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000014,
                                _ver: 1
                            }
                        ]
                    }
                ));
                const accessControlRequest2 = JSON.parse(accessControlApiInfos[1][2] as string);
                // item.target.parameterの確認
                expect(accessControlRequest2[0].target.parameter).toBe(JSON.stringify(
                    {
                        document: [
                            {
                                _value: 1000500,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000009,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000014,
                                _ver: 1
                            },
                            {
                                _value: 1000015,
                                _ver: 1
                            }
                        ]
                    }
                ));
            });
            test('正常: 共有のリクエストに共有元指定がある（共有元がひとつ）', async () => {
                CatalogServer = new StubCatalogServer(true);
                await CatalogServer.start();
                IdServiceServer= new StubIdServiceServer(200, 200);
                await IdServiceServer.start();
                const response = await supertest(expressApp)
                    .post(baseURI)
                    .set({
                        'access-token': 'access-token',
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A1000114%2C%22_ver%22%3A1%7D%7D'
                    })
                    .send([{
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
                                loginId: 'app_member01'
                            },
                            requestBody: {
                                userId: 'test_user_#7434',
                                document: [
                                    {
                                        _value: 1000500,
                                        _ver: 1
                                    }
                                ],
                                event: [
                                    {
                                        _value: 1000009,
                                        _ver: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _value: 1000014,
                                        _ver: 1
                                    }
                                ],
                                actor: {
                                    _value: 1000020,
                                    _ver: 1
                                },
                                app: {
                                    _value: 1000008,
                                    _ver: 1
                                },
                                wf: null
                            }
                        },
                        target: {
                            apiUrl: '/book-operate/share/search',
                            apiMethod: 'POST'
                        }
                    }]);

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

                // Book管理サービス.共有可否チェックAPI へのリクエストの確認
                const bookManageApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/setting/share/permission');
                const bookManageRequest = JSON.parse(bookManageApiInfos[0][2] as string);
                expect(bookManageRequest).toMatchObject({                                                                                                                                                                                                                                                                                           
                    userId: 'test_user_#7434',
                    appCode: 1000007,
                    actorCode: 1000114,
                    document: [
                        {
                            _value: 1000500,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000009,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000014,
                            _ver: 1
                        }
                    ],
                    sourceActor: 1000020,
                    sourceAsset: 1000008
                });

                // アクセス制御サービス.APIトークン生成API へのリクエストの確認
                const accessControlApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3015/access-control');
                
                const accessControlRequest1 = JSON.parse(accessControlApiInfos[0][2] as string);
                expect(accessControlRequest1[0].target.parameter).toBe(JSON.stringify(
                    {
                        document: [
                            {
                                _value: 1000500,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000009,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000014,
                                _ver: 1
                            }
                        ]
                    }
                ));
            });
        });
        describe('異常系:', () => {
            test('異常: Book管理サービス.共有可否チェックAPIの結果が共有不可', async () => {
                CatalogServer = new StubCatalogServer(true);
                await CatalogServer.start();
                IdServiceServer= new StubIdServiceServer(200, 200);
                await IdServiceServer.start();
                const response = await supertest(expressApp)
                    .post(baseURI)
                    .set({
                        'access-token': 'access-token',
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        session: '%7B%22sessionId%22%3A%222212d4a969f24f5e341470c546006d6552d1aa3c0cf60abc3002c5b29143c1ca%22%2C%22operatorId%22%3A1%2C%22type%22%3A3%2C%22loginId%22%3A%22root_member01%22%2C%22name%22%3A%22%E9%81%8B%E5%96%B6%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC01%22%2C%22mobilePhone%22%3A%2209011112222%22%2C%22auth%22%3A%7B%22add%22%3Atrue%2C%22update%22%3Atrue%2C%22delete%22%3Atrue%7D%2C%22lastLoginAt%22%3A%222019-10-1814%3A07%3A43%22%2C%22passwordChangedFlg%22%3Afalse%2C%22attributes%22%3A%7B%7D%2C%22roles%22%3A%5B%7B%22_value%22%3A1%2C%22_ver%22%3A1%7D%5D%2C%22block%22%3A%7B%22_value%22%3A10001%2C%22_ver%22%3A1%7D%2C%22actor%22%3A%7B%22_value%22%3A1000114%2C%22_ver%22%3A1%7D%7D'
                    })
                    .send([{
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
                                loginId: 'app_member01'
                            },
                            requestBody: {
                                userId: 'share_permission_fail_user',
                                document: null,
                                event: [
                                    {
                                        _value: 1000009,
                                        _ver: 1
                                    }
                                ],
                                thing: null
                            }
                        },
                        target: {
                            apiUrl: '/book-operate/share/search',
                            apiMethod: 'POST'
                        }
                    }]);

                expect(response.status).toBe(401);
                expect(response.body.message).toBe('リクエストされたデータ種を共有できるように許可されていません');

                // Book管理サービス.共有可否チェックAPI へのリクエストの確認
                const bookManageApiInfos = mockDoRequest.mock.calls.filter(elem => elem[1] === 'http://localhost:3005/book-manage/setting/share/permission');
                const bookManageRequest = JSON.parse(bookManageApiInfos[0][2] as string);
                expect(bookManageRequest).toMatchObject({                                                                                                                                                                                                                                                                                           
                    userId: 'share_permission_fail_user',
                    appCode: 1000007,
                    actorCode: 1000114,
                    document: null,
                    event: [
                        {
                            _value: 1000009,
                            _ver: 1
                        }
                    ],
                    thing: null,
                    sourceActor: null,
                    sourceAsset: null
                });
            });
        });
    });
});
