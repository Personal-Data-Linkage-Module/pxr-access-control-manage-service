/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { BaseStubServer } from './StubServer';
import BLOCK_CATALOG = require('./catalog/1000109.json');
import ROOT_BLOCK_CATALOG = require('./catalog/1000110.json');
import ACTOR_CATALOG = require('./catalog/1000000.json');
import NON_BLOCK_NS_CATALOG = require('./catalog/0.json');
import DATA_TRADER_CATALOG = require('./catalog/1000020.json');
import Catalog1000384 = require('./catalog/1000384.json');
import Catalog1000385 = require('./catalog/1000385.json');
/* eslint-enable */


export class EmptyResponseStubAccessControlServer extends BaseStubServer {
    constructor () {
        super();
        this.port = 3015;
        this.app.post('/access-control', (req, res) => {
            res.status(204).end();
        });
    }
}

export class EmptyResponseStubBookManageServer extends BaseStubServer {
    constructor (path: string) {
        super();
        if (path !== '/book-manage/settings/share') {
            this.app.get('/book-manage/settings/share', (req, res) => {
                res.status(200).json([
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": null,
                        "wf": {
                            "_value": 1000007
                        },
                        "share": {
                            "_value": 1000384,
                            "_ver": 1
                        }
                    }
                ]);
            });
        } if (path !== '/book-manage/ind/settings/share/temp/collation') {
            this.app.post('/book-manage/ind/settings/share/temp/collation', (req, res) => {
                res.status(200).json({
                    "id": 1,
                    "pxrId": 'pxr_user01',
                    status: 0,
                    "actor": {
                        "_value": 1000004
                    },
                    "app": null,
                    "wf": {
                        "_value": 1000007
                    },
                    "document": [
                        {
                            "_value": 1000999,
                            "_ver": 1
                        }
                    ],
                    "event": [
                        {
                            "_value": 1000008,
                            "_ver": 1
                        }
                    ],
                    "thing": [
                        {
                            "_value": 1000011,
                            "_ver": 1
                        }
                    ]
                }).end();
            });
        } if (path !== '/book-manage/search/user') {
            this.app.post('/book-manage/search/user', (req, res) => {
                res.status(200).json([{
                    pxrId: 'pxr_user00',
                    bookStatus: 0,
                }, {
                    pxrId: 'pxr_user01',
                    bookStatus: 0,
                    cooperation: [{
                        actor: {
                            _value: 10002,
                            _ver: 1
                        },
                        userId: 'xxx_yyy.wf1'
                    }]
                }, {
                    pxrId: 'pxr_user02',
                    bookStatus: 0,
                    cooperation: [{
                        actor: {
                            _value: 10002,
                            _ver: 1
                        },
                        userId: 'xxx_yyy.wf3'
                    }]
                }]).end();
            });
        }
        this.app.get(path, (req, res) => {
            console.log('get');
            res.status(204).end();
        });
        this.app.post(path, (req, res) => {
            console.log('post');
            res.status(204).end();
        });
        this.port = 3005;
    }
}

export class EmptyResponseStubCTokenLedgerServer extends BaseStubServer {
    constructor () {
        super();
        this.app.post('/ctoken-ledger/count/', (req, res) => {
            res.status(204).json().end();
        });
        this.port = 3008;
    }
}

export class EmptyResponseStubCatalogServerNsSearch extends BaseStubServer {
    constructor () {
        super();
        this.app.get('/catalog/:code', (req, res) => {
            const code = parseInt(req.params.code);
            if (code === 1) {
                res.status(204).end();
            } else if (code === 2) {
                res.status(400).end();
            } else if (code === 3) {
                res.status(500).end();
            } else if (code === 1000109) {
                res.status(200).json(BLOCK_CATALOG).end();
            } else if (code === 1000110) {
                res.status(200).json(ROOT_BLOCK_CATALOG).end();
            } else if (code === 1000114) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000020) {
                res.status(200).json(DATA_TRADER_CATALOG).end();
            } else if (code === 1000384) {
                res.status(200).json(Catalog1000384).end();
            } else if (code === 1000385) {
                res.status(200).json(Catalog1000385).end();
            } else {
                res.status(200).json(NON_BLOCK_NS_CATALOG).end();
            }
        });
        this.app.get('/catalog', (req, res) => {
            res.status(404).json([]).end();
        });
        this.port = 3001;
    }
}
