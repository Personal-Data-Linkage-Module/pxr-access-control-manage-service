/* eslint-disable */
import { BaseStubServer } from './StubServer';
import BLOCK_CATALOG = require('./catalog/1000109.json');
import ROOT_BLOCK_CATALOG = require('./catalog/1000110.json');
import ACTOR_CATALOG = require('./catalog/1000000.json');
import NON_BLOCK_NS_CATALOG = require('./catalog/0.json');
import DATA_TRADER_CATALOG = require('./catalog/1000020.json');
import Catalog1000007 = require('./catalog/1000007.json');
import Catalog1000384 = require('./catalog/1000384.json');
import Catalog1000385 = require('./catalog/1000385.json');
import WrongData_AccessTokenVerifySetting10099Wf = require('./catalog/actor_10099_verify-access-tokenWf.json');
import NamespaceActor1000020WfSharingRestriction = require('./catalog/actor_1000020_wf_restriction.json');
import NamespaceActor1000020AppSharingRestriction = require('./catalog/actor_1000020_app_restriction.json');
/* eslint-enable */


export class WrongDataStubAccessControlServer extends BaseStubServer {
    constructor () {
        super();
        this.port = 3015;
        this.app.post('/access-control', (req, res) => {
            res.status(200).json([{
                apiUrl: 'a',
                apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                userId: 'a'
            }]).end();
        });
    }
}

export class WrongDataStubBookManageServer extends BaseStubServer {
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
                        "share": [
                            {
                                "code": {
                                    "_value": 1000384,
                                    "_ver": 1
                                },
                                "trigger": [
                                    {
                                        "code": {
                                            "_value": 1000510,
                                            "_ver": 1
                                        },
                                        "status": 1,
                                        "shareId": [
                                            "39a03074-856e-5daa-d792-9d672bb9c7ef"
                                        ],
                                        "startCondition": {
                                            "document": [
                                                {
                                                    "code": {
                                                        "_value": 1000823,
                                                        "_ver": 1
                                                    }
                                                }
                                            ],
                                            "event": [
                                                {
                                                    "code": {
                                                        "_value": 1000811,
                                                        "_ver": 1
                                                    },
                                                    "thing": [

                                                        {
                                                            "_value": 1000814,
                                                            "_ver": 1
                                                        }

                                                    ]
                                                }
                                            ],
                                            "thing": [
                                                {
                                                    "_value": 1000815,
                                                    "_ver": 1
                                                }
                                            ],
                                            "period": {
                                                "specification": "spacification",
                                                "unit": "minut",
                                                "value": 10
                                            },
                                            "decisionAPI": {
                                                "_value": 9999999,
                                                "_ver": 1
                                            }
                                        },
                                        "endCondition": {
                                            "document": [
                                                {
                                                    "code": {
                                                        "_value": 1000999,
                                                        "_ver": 1
                                                    }
                                                }
                                            ],
                                            "event": [
                                                {
                                                    "code": {
                                                        "_value": 1000811,
                                                        "_ver": 1
                                                    },
                                                    "thing": [
                                                        {
                                                            "_value": 1000814,
                                                            "_ver": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "thing": [
                                                {
                                                    "_value": 2000000,
                                                    "_ver": 1
                                                }
                                            ],
                                            "period": {
                                                "specification": "spacification",
                                                "unit": "minut",
                                                "value": 10
                                            },
                                            "decisionAPI": {
                                                "_value": 9999999,
                                                "_ver": 1
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]);
            });
        } if (path !== '/book-manage/share/temp/collation') {
            this.app.post('/book-manage/share/temp/collation', (req, res) => {
                res.status(200).json({
                    "id": 1,
                    "pxrId": 'pxr_user01',
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
                if (req.body['userId'] === 'requestUserId01') {
                    res.status(200).json({
                        pxrId: 'pxr_user10',
                        bookStatus: 0,
                        cooperation: [{
                            actor: {
                                _value: 10002,
                                _ver: 1
                            },
                            userId: 'xxx_yyy.wf1',
                            status: 1
                        }]
                    }).end();
                } else {
                    res.status(200).json({
                        pxrId: 'pxr_user01',
                        bookStatus: 0,
                        cooperation: [{
                            actor: {
                                _value: 10002,
                                _ver: 1
                            },
                            userId: 'xxx_yyy.wf1',
                            status: 1
                        }]
                    }).end();
                }
            });
        } if (path !== '/book-manage/person/relationship/two-way/search/:pxrId') {
            this.app.post('/book-manage/person/relationship/two-way/search/:pxrId', (req, res) => {
                res.status(200).json([
                    {
                        "relationshipsId": 1,
                        "relationshipsLabel": "夫婦",
                        "source": {
                            "personId": 1,
                            "label": "夫",
                            "approvalStatus": 1
                        },
                        "destination": {
                            "personId": 2,
                            "label": "妻",
                            "approvalStatus": 1
                        },
                        "relationshipsAt": {
                            "start": "2020-08-01T00:00:00.000+0900",
                            "end": "2020-09-01T00:00:00.000+0900"
                        },
                        "isDisabled": false
                    },
                    {
                        "relationshipsId": 2,
                        "relationshipsLabel": "家族",
                        "source": {
                            "personId": 1,
                            "label": "夫",
                            "approvalStatus": 1
                        },
                        "destination": {
                            "personId": 2,
                            "label": "妻",
                            "approvalStatus": 1
                        },
                        "relationshipsAt": {
                            "start": "2020-08-01T00:00:00.000+0900",
                            "end": null
                        },
                        "isDisabled": false
                    }
                ]).end();
            });
        } if (path !== '/book-manage/setting/share/person-to-person') {
            this.app.get('/book-manage/setting/share/person-to-person', (req, res) => {
                res.status(200).json([
                    {
                        "id": 1,
                        "document": [
                            {
                                "actor": {
                                    "_value": 1000436,
                                    "_ver": 1
                                },
                                "wf": null,
                                "app": {
                                    "_value": 1000461,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                }
                            }
                        ],
                        "thing": [
                            {
                                "actor": {
                                    "_value": 1000436,
                                    "_ver": 1
                                },
                                "wf": null,
                                "app": {
                                    "_value": 1000461,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000011,
                                    "_ver": 1
                                }
                            }
                        ],
                        "relationshipsId": 10
                    }
                ]).end();
            });
        } if (path !== '/book-manage/share/temp/person-to-person/collation') {
            this.app.get('/book-manage/share/temp/person-to-person/collation', (req, res) => {
                res.status(200).json({
                    "id": 1,
                    "pxrId": 'pxr_user01',
                    status: 0,
                    "document": [
                        {
                            "actor": {
                                "_value": 1000004
                            },
                            "app": null,
                            "wf": {
                                "_value": 1000007
                            },
                            "code": {
                                "_value": 1000999,
                                "_ver": 1
                            },
                        }
                    ],
                    "event": [
                        {
                            "actor": {
                                "_value": 1000004
                            },
                            "app": null,
                            "wf": {
                                "_value": 1000007
                            },
                            "code": {
                                "_value": 1000008,
                                "_ver": 1
                            },
                        }
                    ],
                    "thing": [
                        {
                            "actor": {
                                "_value": 1000004
                            },
                            "app": null,
                            "wf": {
                                "_value": 1000007
                            },
                            "code": {
                                "_value": 1000011,
                                "_ver": 1
                            },
                        }
                    ]
                }).end();
            });
        }
        this.app.get(path, (req, res) => {
            res.status(200).json([{ pxrId: { pxrId: { pxrId: '' }  } }, {  }]).end();
        });
        this.app.post(path, (req, res) => {
            res.status(200).json([{ pxrId: { pxrId: { pxrId: '' }  } }, {  }]).end();
        });
        this.port = 3005;
    }
}

export class WrongDataStubCTokenLedgerServer extends BaseStubServer {
    constructor () {
        super();
        this.app.post('/ctoken-ledger/count/', (req, res) => {
            res.status(200).json([{ }]).end();
        });
        this.port = 3008;
    }
}

export class WrongDataStubCatalogServerNsSearch extends BaseStubServer {
    constructor () {
        super();
        this.app.get('/catalog/name', (req, res) => {
            const code = parseInt(req.params.code);
            res.status(200).json({
                "ext_name": "osaka-u-society5.0"
            }).end();
        });
        this.app.get('/catalog/:code', (req, res) => {
            const code = parseInt(req.params.code);
            if (code === 1) {
                res.status(204).end();
            } else if (code === 2) {
                res.status(400).end();
            } else if (code === 3) {
                res.status(500).end();
            } else if (code === 1000007) {
                res.status(200).json(Catalog1000007).end();
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
            const ns = decodeURIComponent(req.query.ns as string);
            if (ns === 'catalog/ext/osaka-u-society5.0/actor/wf/actor_10002/verify-access-token') {
                res.status(200).json(WrongData_AccessTokenVerifySetting10099Wf).end();
            } else if (ns === 'catalog/ext/osaka-u-society5.0/actor/wf/actor_1000020/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/osaka-u-society5.0/actor/app/actor_1000020/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020AppSharingRestriction).end();
            } else {
                res.status(200).json([{ }, { }]).end();
            }
        });
        this.app.get('/catalog/:code/:version', (req, res) => {
            const code = parseInt(req.params.code);
            if (code === 1) {
                res.status(204).end();
            } else if (code === 1000385) {
                if (req.query['includeDeleted'] === 'true') {
                    res.status(200).json(Catalog1000385).end();
                } else {
                    const cat = JSON.parse(JSON.stringify(Catalog1000385));
                    cat['catalogItem']['_code']['_ver'] = 2;
                    cat['template']['share'].push({
                        "id": "3bcdb1d1-aab5-4199-b287-6d5f62936ec2",
                        "role": [
                            {
                                "_value": 1001193,
                                "_ver": 1
                            }
                        ],
                        "document": [
                            {
                                "code": {
                                    "_value": 1001272,
                                    "_ver": 3
                                },
                                "requireConsent": true,
                                "sourceActor": [
                                    {
                                        "_value": 1001021,
                                        "_ver": 31
                                    }
                                ]
                            }
                        ],
                        "event": [
                            {
                                "code": {
                                    "_value": 1001027,
                                    "_ver": 7
                                },
                                "thing": [
                                    {
                                        "code": {
                                            "_value": 1001025,
                                            "_ver": 4
                                        },
                                        "requireConsent": true
                                    },
                                    {
                                        "code": {
                                            "_value": 1001026,
                                            "_ver": 4
                                        },
                                        "requireConsent": false
                                    },
                                    {
                                        "code": {
                                            "_value": 1001062,
                                            "_ver": 1
                                        },
                                        "requireConsent": true
                                    }
                                ],
                                "requireConsent": false,
                                "sourceActor": [
                                    {
                                        "_value": 1001021,
                                        "_ver": 31
                                    }
                                ]
                            }
                        ]
                    });
                    res.status(200).json(cat).end();
                }
            }
        });
        this.port = 3001;
    }
}
