/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';

const expressApp = Application.express.app;

// Unitテスト対象のURL（ベース）
const baseURI = '/access-control-manage';

// Access-Control Manage Service APIのユニットテスト
describe('Access-Control Manage Service', () => {
    beforeAll(async () => {
        await Application.start();
    });
    // テストがすべて終了したら実行される事後処理
    afterAll(async () => {
        // アプリケーションの停止
        Application.stop();
    });

    // POSTメソッド（Store）のAPIテスト
    describe('データ蓄積APIトークン生成指示 POST: ' + baseURI + '/store', () => {
        // リクエストが存在しないリクエスト
        test('リクエストが空', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send();

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストが配列ではない
        test('リクエストが配列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send({});

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value'
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストパターンにより、必須値が変わる
        test('リクエストの宛先Blockコードがなく、呼出元情報にユーザーIDがない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: null, // undefined型であるが、callerオブジェクトにuserIdがない為、エラー
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // UUIDではない
        test('APIコードがUUIDではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: '9cf3da0-5f6e-46c7-b913-0227482abebc', // 最初の部分が8文字以下でエラー
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストする値の型が、制御不可であり、後続の処理にて503エラーが起きないかを確認
        test('リクエストする値の型が、規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: {
                            key: 'value' // ここは、配列やオブジェクトを期待せず、単なる値を期待する。エラー
                        },
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストメソッド名が、規定している（GET, PUT, POST, DELETE, OPTIONS）ではない
        test('リクエストメソッドが規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'OPTIONS', // OPTIONSは、規定している正しい値
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        userId: '',
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'ADD' // このようなメソッドは規定していないのでエラー
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 期待する型ではない（数値）
        test('期待する型ではない（数値）', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444, // 数値である為、エラーは発生せず
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: '1', // 数値への変換が可能の為、エラーは発生せず
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 'string', // 数値への変換もできず、エラー
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // オペレーターの種別が認可外
        test('オペレーターの種別が認可外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 4, // [0,2,3]ではない為、エラー
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 個人オペレーターでのBad Request
        test('オペレーター種別(0)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 運営オペレーターでのBad Request
        test('オペレーター種別(3)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 3,
                            loginId: 1234567 // 文字列以外だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、配列だが空である', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [] // 配列が空であるため、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、数値ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [
                                {
                                    _value: '1', // 変換可能のため、問題なし
                                    _ver: 'string' // 変換できず、エラー
                                }
                            ]
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {} // 空のオブジェクトの為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1', // 変換可能の為、問題なし
                                _ver: 'string' // 変換できず、エラー
                            }
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // ログインIDが未設定
        test('ログインIDが未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            } // ,
                            // loginId = 'member01' // 未設定の為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // ログインIDが数値・文字列ではない
        test('ログインIDが数値・文字列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/store')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            loginId: [] // 文字列や数値ではない為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });
    });

    // POSTメソッド（Share continuous）のAPIテスト
    describe('継続的データ共有APIトークン生成指示 POST: ' + baseURI + '/share/continuous', () => {
        // リクエストが存在しないリクエスト
        test('リクエストが空', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send();

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストが配列ではない
        test('リクエストが配列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send({});

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value'
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストパターンにより、必須値が変わる
        test('リクエストの宛先Blockコードがなく、呼出元情報にユーザーIDがない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: null, // undefined型であるが、callerオブジェクトにuserIdがない為、エラー
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // UUIDではない
        test('APIコードがUUIDではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: '9cf3da0-5f6e-46c7-b913-0227482abebc', // 最初の部分が8文字以下でエラー
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストする値の型が、制御不可であり、後続の処理にて503エラーが起きないかを確認
        test('リクエストする値の型が、規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: {
                            key: 'value' // ここは、配列やオブジェクトを期待せず、単なる値を期待する。エラー
                        },
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストメソッド名が、規定している（GET, PUT, POST, DELETE, OPTIONS）ではない
        test('リクエストメソッドが規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'OPTIONS', // OPTIONSは、規定している正しい値
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'ADD' // このようなメソッドは規定していないのでエラー
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 期待する型ではない（数値）
        test('期待する型ではない（数値）', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444, // 数値である為、エラーは発生せず
                        apiUrl: '/book-manage/{userId}/contract',
                        userId: 'xxx_yyy.1',
                        apiMethod: 'GET',
                        operator: {
                            type: '1', // 数値への変換が可能の為、エラーは発生せず
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 'string', // 数値への変換もできず、エラー
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // オペレーターの種別が認可外
        test('オペレーターの種別が認可外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 4, // [0-3]ではない為、エラー
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 個人オペレーターでのBad Request
        test('オペレーター種別(0)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 運営オペレーターでのBad Request
        test('オペレーター種別(3)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 3 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、配列だが空である', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [] // 配列が空であるため、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、数値ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [
                                {
                                    _value: 1,
                                    _ver: 1
                                },
                                {
                                    _value: '1', // 変換可能のため、問題なし
                                    _ver: 'string' // 変換できず、エラー
                                }
                            ]
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {} // 空のオブジェクトの為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1', // 変換可能の為、問題なし
                                _ver: 'string' // 変換できず、エラー
                            }
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // ログインIDが未設定
        test('ログインIDが未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            } // ,
                            // loginId = 'member01' // 未設定の為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // ログインIDが数値・文字列ではない
        test('ログインIDが数値・文字列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/continuous')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            loginId: [] // 文字列や数値ではない為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });
    });

    // POSTメソッド（Share temporary）のAPIテスト
    describe('一時的データ共有APIトークン生成指示 POST: ' + baseURI + '/share/temp', () => {
        // リクエストが存在しないリクエスト
        test('リクエストが空', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send();

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストが配列ではない
        test('リクエストが配列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send({});

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value'
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストパターンにより、必須値が変わる
        test('リクエストの宛先Blockコードがなく、呼出元情報にユーザーIDがない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: null, // undefined型であるが、callerオブジェクトにuserIdがない為、エラー
                        userId: '',
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // UUIDではない
        test('APIコードがUUIDではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: '9cf3da0-5f6e-46c7-b913-0227482abebc', // 最初の部分が8文字以下でエラー
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        userId: '',
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストする値の型が、制御不可であり、後続の処理にて503エラーが起きないかを確認
        test('リクエストする値の型が、規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: {
                            key: 'value' // ここは、配列やオブジェクトを期待せず、単なる値を期待する。エラー
                        },
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストメソッド名が、規定している（GET, PUT, POST, DELETE, OPTIONS）ではない
        test('リクエストメソッドが規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'OPTIONS', // OPTIONSは、規定している正しい値
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        userId: '',
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'ADD' // このようなメソッドは規定していないのでエラー
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 期待する型ではない（数値）
        test('期待する型ではない（数値）', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444, // 数値である為、エラーは発生せず
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: '1', // 数値への変換が可能の為、エラーは発生せず
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 'string', // 数値への変換もできず、エラー
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // オペレーターの種別が認可外
        test('オペレーターの種別が認可外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 4, // [0-3]ではない為、エラー
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 個人オペレーターでのBad Request
        test('オペレーター種別(0)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 運営オペレーターでのBad Request
        test('オペレーター種別(3)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 3 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、配列だが空である', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        userId: 'xxx_yyy.1',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [] // 配列が空であるため、エラー
                        }
                    },
                    target: {
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、数値ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [
                                {
                                    _value: '1', // 変換可能のため、問題なし
                                    _ver: 'string' // 変換できず、エラー
                                }
                            ]
                        }
                    },
                    target: {
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {} // 空のオブジェクトの為、エラー
                        }
                    },
                    target: {
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1', // 変換可能の為、問題なし
                                _ver: 'string' // 変換できず、エラー
                            }
                        }
                    },
                    target: {
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // ログインIDが未設定
        test('ログインIDが未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            } // ,
                            // loginId = 'member01' // 未設定の為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // ログインIDが数値・文字列ではない
        test('ログインIDが数値・文字列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            loginId: [] // 文字列や数値ではない為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 一時的データ共有コードがUUID形式ではない
        test('一時的データ共有コードがUUID形式ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/share/temp')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        tempShareCode: '9cf3da0-5f6e-46c7-b913-0227482abebc', // UUID形式ではない為、エラー
                        operator: {
                            type: 2,
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            loginId: 'member01'
                        }
                    },
                    target: {
                        userId: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });
    });

    // POSTメソッド（Block）のAPIテスト
    describe('Block間APIトークン生成指示 POST: ' + baseURI + '/block', () => {
        // リクエストが存在しないリクエスト
        test('リクエストが空', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send();

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストが配列ではない
        test('リクエストが配列ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send({});

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value',
                        operator: {
                            key: 'value'
                        }
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストには、必須値がない
        test('リクエスト配列のオブジェクトに、必須値がない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send([{
                    caller: {
                        key: 'value'
                    },
                    target: {
                        key: 'value'
                    }
                }]);

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストパターンにより、必須値が変わる
        test('リクエストの宛先Blockコードがなく、呼出元情報にユーザーIDがない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: null, // undefined型であるが、callerオブジェクトにuserIdがない為、エラー
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // UUIDではない
        test('APIコードがUUIDではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: '9cf3da0-5f6e-46c7-b913-0227482abebc', // 最初の部分が8文字以下でエラー
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストする値の型が、制御不可であり、後続の処理にて503エラーが起きないかを確認
        test('リクエストする値の型が、規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: {
                            key: 'value' // ここは、配列やオブジェクトを期待せず、単なる値を期待する。エラー
                        },
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // リクエストメソッド名が、規定している（GET, PUT, POST, DELETE, OPTIONS）ではない
        test('リクエストメソッドが規定外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'OPTIONS', // OPTIONSは、規定している正しい値
                        operator: {
                            type: 0,
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'ADD' // このようなメソッドは規定していないのでエラー
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 期待する型ではない（数値）
        test('期待する型ではない（数値）', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444, // 数値である為、エラーは発生せず
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: '1', // 数値への変換が可能の為、エラーは発生せず
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 'string', // 数値への変換もできず、エラー
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // オペレーターの種別が認可外
        test('オペレーターの種別が認可外', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 4, // [0-3]ではない為、エラー
                            loginId: 'xxx_yyy.pxr-root'
                        }
                    },
                    target: {
                        blockCode: 4444444,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 個人オペレーターでのBad Request
        test('オペレーター種別(0)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 0 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // 運営オペレーターでのBad Request
        test('オペレーター種別(3)の場合の必須値が、未設定', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 3 // ,
                            // loginId: 'xxx_yyy.pxr-root' // 未設定だとエラーになる
                        }
                    },
                    target: {
                        blockCode: null, // undefined型でも問題はない
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、配列だが空である', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [] // 配列が空であるため、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、数値ではない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            loginId: 'xxx_yyy.pxr-root',
                            app: {
                                _value: '1',
                                _ver: 2
                            },
                            role: [
                                {
                                    _value: '1', // 変換可能のため、問題なし
                                    _ver: 'string' // 変換できず、エラー
                                }
                            ]
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {} // 空のオブジェクトの為、エラー
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });

        // アプリケーションオペレーターでのBad Request
        test('オペレーター種別(2)の場合の必須値が、存在しない', async () => {
            const response = await supertest(expressApp)
                .post(baseURI + '/block')
                .set({
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                })
                .send(JSON.stringify([{
                    caller: {
                        apiCode: 'c9cf3da0-5f6e-46c7-b913-0227482abebc',
                        blockCode: 4444444,
                        userId: 'xxx_yyy.1',
                        apiUrl: '/book-manage/{userId}/contract',
                        apiMethod: 'GET',
                        operator: {
                            type: 2,
                            app: {
                                _value: '1', // 変換可能の為、問題なし
                                _ver: 'string' // 変換できず、エラー
                            }
                        }
                    },
                    target: {
                        blockCode: null,
                        apiUrl: '/info-account-manage/{userId}/contract',
                        apiMethod: 'GET'
                    }
                }]));

            // Expect status Bad Request
            expect(response.status).toBe(400);
        });
    });
});
