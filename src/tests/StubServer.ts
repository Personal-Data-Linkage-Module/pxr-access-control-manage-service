/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { Server } from 'net';
import bodyParser = require('body-parser');
import BLOCK_CATALOG = require('./catalog/1000109.json');
import ROOT_BLOCK_CATALOG = require('./catalog/1000110.json');
import ACTOR_CATALOG = require('./catalog/1000000.json');
import TRADE_CATALOG = require('./catalog/1000300.json');
import NON_BLOCK_NS_CATALOG = require('./catalog/0.json');
import Catalog1000007 = require('./catalog/1000007.json');
import Catalog1000008 = require('./catalog/1000008.json');
import Catalog1000009 = require('./catalog/1000009.json');
import Catalog1000010 = require('./catalog/1000010.json');
import Catalog1100010 = require('./catalog/1100010.json');
import Catalog1200010 = require('./catalog/1200010.json');
import Catalog1000040 = require('./catalog/1000040.json');
import Catalog1000060 = require('./catalog/1000060.json');
import Catalog1000384 = require('./catalog/1000384.json');
import Catalog1000385 = require('./catalog/1000385.json');
import Catalog1000394 = require('./catalog/1000394.json');
import Catalog1000108 = require('./catalog/setting_actor_own_app_actor_1000020.json');
import NamespaceActorSetting1000020 = require('./catalog/setting_actor_app_actor_1000020.json');
import NamespaceMemberAuth = require('./catalog/member_ns.json');
import NamespaceActor1000020Setting = require('./catalog/actor_1000020_setting.json');
import NamespaceAppSetting = require('./catalog/app-setting.json');
import NamespaceActor1000020AppSharingRestriction = require('./catalog/actor_1000020_app_restriction.json');
import NamespaceActor1000020WfSharingRestriction = require('./catalog/actor_1000020_wf_restriction.json');
import NamespaceActor1000120WfSharingRestriction = require('./catalog/actor_1000120_wf_restriction.json');
import NamespaceActor1000121WfSharingRestriction = require('./catalog/actor_1000121_wf_restriction.json');
import NamespaceActor1000122WfSharingRestriction = require('./catalog/actor_1000122_wf_restriction.json');
import NamespaceActor1000123WfSharingRestriction = require('./catalog/actor_1000123_wf_restriction.json');
import NamespaceActor1000125AppSharingRestriction = require('./catalog/actor_1000125_app_restriction.json');
import NamespaceActor1000126AppSharingRestriction = require('./catalog/actor_1000126_app_restriction.json');
import NamespaceActor1000127AppSharingRestriction = require('./catalog/actor_1000127_app_restriction.json');
import NamespaceActor1000128AppSharingRestriction = require('./catalog/actor_1000128_app_restriction.json');
import NamespaceActor1000130AppSharingRestriction = require('./catalog/actor_1000130_app_restriction.json');
import NamespaceActor1000131AppSharingRestriction = require('./catalog/actor_1000131_app_restriction.json');
import NamespaceActor1000132AppSharingRestriction = require('./catalog/actor_1000132_app_restriction.json');
import NamespaceActor1000133AppSharingRestriction = require('./catalog/actor_1000133_app_restriction.json');
import Actor1000114Store = require('./catalog/actor_1000114_store.json');
import Actor1000114WorkFlow = require('./catalog/actor_1000114_workflow.json');
import AccessTokenVerifySetting1000114Wf = require('./catalog/actor_1000114_verify-access-tokenWf.json');
import AccessTokenVerifySetting1000114App = require('./catalog/actor_1000114_verify-access-tokenApp.json');
import AccessTokenVerifySetting1000115App = require('./catalog/actor_1000115_verify-access-tokenApp.json');
import AccessTokenVerifySetting1000116App = require('./catalog/actor_1000116_verify-access-tokenApp.json');
import AccessTokenVerifySetting10002Wf = require('./catalog/actor_10002_verify-access-tokenWf.json');
import AccessTokenVerifySetting10002App = require('./catalog/actor_10002_verify-access-tokenApp.json');
/* eslint-enable */

export class BaseStubServer {
    app: express.Express;
    server: Server;
    port: number;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    async start() {
        return new Promise<void>((resolve, reject) => {
            this.server = this.app.listen(this.port, () => { resolve(); });
        });
    }

    async stop() {
        return new Promise<void>((resolve, reject) => {
            this.server.close(() => { resolve(); });
        });
    }
}

export class StubCatalogServer extends BaseStubServer {
    constructor(useIdService?: boolean, type?: string) {
        super();
        this.app.get('/catalog/name', (req, res) => {
            const code = parseInt(req.params.code);
            res.status(200).json({
                "ext_name": "test-org"
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
            } else if (code === 1000108) {
                res.status(200).json(Catalog1000108).end();
            } else if (code === 1000109) {
                res.status(200).json(BLOCK_CATALOG).end();
            } else if (code === 1000110) {
                res.status(200).json(ROOT_BLOCK_CATALOG).end();
            } else if (code === 1000114 || code === 1000020) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000300) {
                res.status(200).json(TRADE_CATALOG).end();
            } else if (code === 1000384) {
                if (req.query['includeDeleted'] === 'true') {
                    res.status(200).json(Catalog1000384).end();
                } else{
                    const cat = JSON.parse(JSON.stringify(Catalog1000384));
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
            } else if (code === 1000385) {
                if (req.query['includeDeleted'] === 'true') {
                    res.status(200).json(Catalog1000385).end();
                } else{
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
            } else if (code === 1000394) {
                res.status(200).json(Catalog1000394).end();
            } else if (code === 1000040) {
                res.status(200).json(Catalog1000040).end();
            } else if (code === 1000060) {
                res.status(200).json(Catalog1000060).end();
            } else if (code === 1000007) {
                res.status(200).json(Catalog1000007).end();
            } else if (code === 1000008) {
                res.status(200).json(Catalog1000008).end();
            } else if (code === 1000009) {
                res.status(200).json(Catalog1000009).end();
            } else if (code === 1000010) {
                res.status(200).json(Catalog1000010).end();
            } else if (code === 1000120) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000121) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000122) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000123) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000124) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000125) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000126) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000127) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000128) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000130) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000131) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000132) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000133) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1100010) {
                res.status(200).json(Catalog1100010).end();
            } else if (code === 1200010) {
                res.status(200).json(Catalog1200010).end();
            } else {
                res.status(200).json(NON_BLOCK_NS_CATALOG).end();
            }
        });
        this.app.get('/catalog/:code/:version', (req, res) => {
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
            } else if (code === 1000114 || code === 1000020) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000384) {
                if (req.query['includeDeleted'] === 'true') {
                    res.status(200).json(Catalog1000384).end();
                } else{
                    const cat = JSON.parse(JSON.stringify(Catalog1000384));
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
            } else if (code === 1000385) {
                if (req.query['includeDeleted'] === 'true') {
                    res.status(200).json(Catalog1000385).end();
                } else{
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
            } else if (code === 1000394) {
                res.status(200).json(Catalog1000394).end();
            } else if (code === 1000040) {
                res.status(200).json(Catalog1000040).end();
            } else if (code === 1000060) {
                res.status(200).json(Catalog1000060).end();
            } else if (code === 1000007) {
                res.status(200).json(Catalog1000007).end();
            } else if (code === 1000008) {
                res.status(200).json(Catalog1000008).end();
            } else if (code === 1000120) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000121) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000122) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000123) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000124) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000125) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000126) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000127) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000128) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000130) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000131) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000132) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else if (code === 1000133) {
                res.status(200).json(ACTOR_CATALOG).end();
            } else {
                res.status(200).json(NON_BLOCK_NS_CATALOG).end();
            }
        });
        this.app.get('/catalog', (req, res) => {
            const ns = decodeURIComponent(req.query.ns as string);
            if (ns === 'catalog/ext/test-org/setting/global') {
                if (!useIdService) {
                    res.status(200).json([{
                        template: {
                            "use_id_connect": false
                        }
                    }]).end();
                } else if (useIdService) {
                    res.status(200).json([{
                        template: {
                            "use_id_connect": true
                        }
                    }]).end();
                }
            } else if (ns === 'catalog/ext/test-org/setting/actor/app/actor_1000020') {
                res.status(200).json(NamespaceActorSetting1000020).end();
            } else if (ns === 'catalog/model/auth/member') {
                res.status(200).json(NamespaceMemberAuth).end();
            } else if (ns === 'catalog/ext/test-org/setting/actor/app/actor_1000020') {
                res.status(200).json(NamespaceActor1000020Setting).end();
            } else if (ns === 'catalog/model/setting/actor/app') {
                res.status(200).json(NamespaceAppSetting).end();
            } else if (ns.indexOf('sharing-restriction') >= 0 && type === 'no-restriction') {
                res.status(404).end();
            } else if (ns.indexOf('verify-access-token') >= 0 && type === 'no-verify') {
                res.status(404).end();
            } else if (ns.indexOf('verify-access-token') >= 0 && type === 'error-verify') {
                res.status(400).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000020/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000020/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000040/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000040/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000060/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000060/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000420/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000420/sharing-restriction') {
                res.status(200).json(NamespaceActor1000020WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000120/sharing-restriction') {
                res.status(200).json(NamespaceActor1000120WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000120/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000121/sharing-restriction') {
                res.status(200).json(NamespaceActor1000121WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000121/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000122/sharing-restriction') {
                res.status(200).json(NamespaceActor1000122WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000122/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000123/sharing-restriction') {
                res.status(200).json(NamespaceActor1000123WfSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000123/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000124/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000124/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000125/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000125/sharing-restriction') {
                res.status(200).json(NamespaceActor1000125AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000126/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000126/sharing-restriction') {
                res.status(200).json(NamespaceActor1000126AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000127/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000127/sharing-restriction') {
                res.status(200).json(NamespaceActor1000127AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000128/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000128/sharing-restriction') {
                res.status(200).json(NamespaceActor1000128AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000130/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000130/sharing-restriction') {
                res.status(200).json(NamespaceActor1000130AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000131/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000131/sharing-restriction') {
                res.status(200).json(NamespaceActor1000131AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000132/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000132/sharing-restriction') {
                res.status(200).json(NamespaceActor1000132AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000133/sharing-restriction') {
                res.status(200).json([]).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000133/sharing-restriction') {
                res.status(200).json(NamespaceActor1000133AppSharingRestriction).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000114/store') {
                res.status(200).json(Actor1000114Store).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000114/workflow') {
                res.status(200).json(Actor1000114WorkFlow).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000114/verify-access-token') {
                res.status(200).json(AccessTokenVerifySetting1000114Wf).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000114/verify-access-token') {
                res.status(200).json(AccessTokenVerifySetting1000114App).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000115/verify-access-token') {
                res.status(200).json(AccessTokenVerifySetting1000115App).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000116/verify-access-token') {
                res.status(200).json(AccessTokenVerifySetting1000116App).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_10002/verify-access-token') {
                res.status(200).json(AccessTokenVerifySetting10002App).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_10002/verify-access-token') {
                res.status(200).json(AccessTokenVerifySetting10002Wf).end();
            } else {
                console.log('Missing this namespace for test: ' + ns);
                res.status(204).end();
            }
        });
        this.port = 3001;
    }
}

export class StubBookManageServer extends BaseStubServer {
    constructor(type?: number) {
        super();
        this.app.get('/book-manage/settings/store/:id', (req, res) => {
            const id = req.params.id;
            if (id === 'id_user_') {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    }
                }).end();
            } else if (id === '_user_id') {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    },
                    document: [
                        {
                            _value: 1000500,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ]
                }).end();
            } else {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    },
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
                }).end();
            }
        });
        this.app.get('/book-manage/settings/share', (req, res) => {
            if (type === 1) {
                res.status(200).json([
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000385,
                                    "_ver": 1
                                }
                            }
                        ]
                    }
                ]);
            } else if (type === 2) {
                res.status(200).json([
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000385,
                                    "_ver": 1
                                }
                            }
                        ]
                    }
                ]);
            } else if (type === 3) {
                res.status(200).json([
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000385,
                                    "_ver": 1
                                }
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000384,
                                    "_ver": 1
                                }
                            }
                        ]
                    }
                ]);
            } else if (type === 99) {
                res.status(200).json([
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000385,
                                    "_ver": 10
                                }
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000384,
                                    "_ver": 10
                                }
                            }
                        ]
                    }
                ]);
            } else {
                res.status(200).json([
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000385,
                                    "_ver": 1
                                }
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "actor": {
                            "_value": 1000004
                        },
                        "app": {
                            "_value": 1000007
                        },
                        "share": [
                            {
                                "code": {
                                    "_value": 1000384,
                                    "_ver": 1
                                }
                            }
                        ]
                    }
                ]);
            }
        });
        this.app.post('/book-manage/ind/settings/share/temp/collation', (req, res) => {
            if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dcc') {
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
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc0') {
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
                    "document": [],
                    "event": [],
                    "thing": []
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc1') {
                res.status(200).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc2') {
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
                    "identifier": [
                        {
                            "document": "fedc51ce-2efd-4ade-9bbe-45dc445ae9c6",
                            "event": [],
                            "thing": []
                        }
                    ]
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc3') {
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
                    "identifier": [
                        {
                            "event": "fedc51ce-2efd-4ade-9bbe-45dc445ae9c6",
                            "thing": []
                        }
                    ]
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc4') {
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
                    "identifier": [
                        {
                            "thing": ["fedc51ce-2efd-4ade-9bbe-45dc445ae9c6"]
                        }
                    ]
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc5') {
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
                    "identifier": [
                        {
                            "document": "fedc51ce-2efd-4ade-9bbe-45dc445ae9c6",
                            "event": ["fedc51ce-2efd-4ade-9bbe-45dc445ae9c6"],
                            "thing": ["fedc51ce-2efd-4ade-9bbe-45dc445ae9c6"]
                        }
                    ]
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc6') {
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
                    "identifier": [
                        {
                            "document": "fedc51ce-2efd-4ade-9bbe-45dc445ae9c6",
                            "event": "fedc51ce-2efd-4ade-9bbe-45dc445ae9c6",
                            "thing": "fedc51ce-2efd-4ade-9bbe-45dc445ae9c6"
                        }
                    ]
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc7') {
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
                    "identifier": [
                        {
                            "document": null,
                            "event": [],
                            "thing": []
                        }
                    ]
                }).end();
            }
        });
        this.app.post('/book-manage/search/user/', (req, res) => {
            if (req.body['userId'] === 'xxx_yyy.wf2') {
                res.status(204).end();
            } else if (req.body['userId'] === 'xxx_yyy.dummy') {
                res.status(200).json([{
                    pxrId: 'pxr_userXXX',
                    bookStatus: 0,
                    cooperation: [{
                        actor: {
                            _value: 10002,
                            _ver: 1
                        },
                        userId: 'xxx_yyy.dummy'
                    }]
                }]).end();
            }else {
                res.status(200).json([{
                    pxrId: 'pxr_user01',
                    bookStatus: 0,
                    cooperation: [{
                        actor: {
                            _value: 10002,
                            _ver: 1
                        },
                        userId: 'xxx_yyy.wf1'
                    }]
                }]).end();
            }
            // res.status(200).json([{
            //     pxrId: 'pxr_user00'
            // }, {
            //     pxrId: 'pxr_user01',
            //     cooperation: [{
            //         actor: {
            //             _value: 10002,
            //             _ver: 1
            //         },
            //         userId: 'xxx_yyy.wf1'
            //     }]
            // }, {
            //     pxrId: 'pxr_user02',
            //     cooperation: [{
            //         actor: {
            //             _value: 10002,
            //             _ver: 1
            //         },
            //         userId: 'xxx_yyy.wf3'
            //     }]
            // }]).end();
        });
        this.app.get('/book-manage/', (req, res) => {
            res.status(200).json(
                {
                    "status": 0
                }
            );
        });
        this.port = 3005;
    }
}

export class StubBookManageServer1 extends BaseStubServer {
    constructor() {
        super();
        this.app.get('/book-manage/settings/store/:id', (req, res) => {
            const id = req.params.id;
            if (id === 'id_user_') {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    }
                }).end();
            } else if (id === '_user_id') {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    },
                    event: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ]
                }).end();
            } else {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    },
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
                }).end();
            }
        });
        this.app.get('/book-manage/settings/share', (req, res) => {
            res.status(200).json([
                {
                    "id": 2,
                    "actor": {
                        "_value": 1000004
                    },
                    "app": null,
                    "wf": {
                        "_value": 1000007
                    },
                    "share": [{
                        "code": {
                            "_value": 1000394,
                            "_ver": 1
                        }
                    }]
                }
            ]);
        });
        this.app.post('/book-manage/ind/settings/share/temp/collation', (req, res) => {
            if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dcc') {
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
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc0') {
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
                    "document": [],
                    "event": [],
                    "thing": []
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc1') {
                res.status(200).end();
            }
        });
        this.app.post('/book-manage/search/user/', (req, res) => {
            res.status(200).json({
                pxrId: 'pxr_user01',
                bookStatus: 0,
                cooperation: [{
                    actor: {
                        _value: 10002,
                        _ver: 1
                    },
                    userId: 'xxx_yyy.wf1'
                }]
            }).end();
            // res.status(200).json([{
            //     pxrId: 'pxr_user00'
            // }, {
            //     pxrId: 'pxr_user01',
            //     cooperation: [{
            //         actor: {
            //             _value: 10002,
            //             _ver: 1
            //         },
            //         userId: 'xxx_yyy.wf1'
            //     }]
            // }, {
            //     pxrId: 'pxr_user02',
            //     cooperation: [{
            //         actor: {
            //             _value: 10002,
            //             _ver: 1
            //         },
            //         userId: 'xxx_yyy.wf3'
            //     }]
            // }]).end();
        });
        this.app.get('/book-manage/', (req, res) => {
            res.status(200).json(
                {
                    "status": 1
                }
            );
        });
        this.port = 3005;
    }
}

export class StubBookManageServer2 extends BaseStubServer {
    constructor() {
        super();
        this.app.get('/book-manage/settings/store/:id', (req, res) => {
            const id = req.params.id;
            if (id === 'id_user_') {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    }
                }).end();
            } else if (id === '_user_id') {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    },
                    event: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 10,
                            _ver: 1
                        }
                    ]
                }).end();
            } else {
                res.status(200).json({
                    id: 1,
                    bookId: 1,
                    regionUseId: null,
                    type: 'store',
                    actor: {
                        _value: 4444444,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007,
                        _ver: 1
                    },
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
                }).end();
            }
        });
        this.app.get('/book-manage/settings/share', (req, res) => {
            res.status(200).json([
                {
                    "id": 2,
                    "actor": {
                        "_value": 1000004
                    },
                    "app": null,
                    "wf": {
                        "_value": 1000007
                    },
                    "share": [{
                        "code": {
                            "_value": 1000394,
                            "_ver": 1
                        }
                    }]
                }
            ]);
        });
        this.app.post('/book-manage/ind/settings/share/temp/collation', (req, res) => {
            if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dcc') {
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
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc0') {
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
                    "document": [],
                    "event": [],
                    "thing": []
                }).end();
            } else if (req.body.tempShareCode === 'f9d540e6-8e39-423e-8eac-cd5063e37dc1') {
                res.status(200).end();
            }
        });
        this.app.post('/book-manage/search/user/', (req, res) => {
            res.status(200).json({
                pxrId: 'pxr_user01',
                cooperation: [{
                    actor: {
                        _value: 10002,
                        _ver: 1
                    },
                    userId: 'xxx_yyy.wf1'
                }]
            }).end();
            // res.status(200).json([{
            //     pxrId: 'pxr_user00'
            // }, {
            //     pxrId: 'pxr_user01',
            //     cooperation: [{
            //         actor: {
            //             _value: 10002,
            //             _ver: 1
            //         },
            //         userId: 'xxx_yyy.wf1'
            //     }]
            // }, {
            //     pxrId: 'pxr_user02',
            //     cooperation: [{
            //         actor: {
            //             _value: 10002,
            //             _ver: 1
            //         },
            //         userId: 'xxx_yyy.wf3'
            //     }]
            // }]).end();
        });
        this.app.get('/book-manage/', (req, res) => {
            res.status(500).end();
        });
        this.port = 3005;
    }
}

export class StubAccessControlServer extends BaseStubServer {
    constructor() {
        super();
        this.port = 3015;
        this.app.post('/access-control', (req, res) => {
            res.status(200).json([{
                apiUrl: 'a',
                apiMethod: 'post',
                apiToken: 'fbe8cc4f80b390ea06b289c676bacc40347a9a812a5fd62588f035372f5dddd2',
                userId: 'a'
            }]).end();
        });
    }
}

export class StubOperatorServer extends BaseStubServer {
    constructor() {
        super();
        this.port = 3000;
        this.app.post('/operator/session', (req, res) => {
            const session = req.body.sessionId;
            if (session === 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 3,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46aaa') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 3,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000300,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'noauth') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 3,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'trader') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 3,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000020,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'workflow') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 1,
                    "loginId": "workflow01",
                    "name": "workflow01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'application') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 2,
                    "loginId": "application01",
                    "name": "application01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1000010",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'application_token') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 2,
                    "loginId": "application01",
                    "name": "application01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1000009",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000115,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'application_no_pxr_id') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 2,
                    "loginId": "application01",
                    "name": "application01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1000010",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000116,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'application_no_region') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 2,
                    "loginId": "application01",
                    "name": "application01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1100010",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'application_not_join_region') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 2,
                    "loginId": "application01",
                    "name": "application01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1200010",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (session === 'ind') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 0,
                    "loginId": "ind_user01",
                    "name": "ind_user01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": null,
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            }
        });
    }
}

export class StubCTokenLedgerServer extends BaseStubServer {
    constructor() {
        super();
        this.app.post('/ctoken-ledger/', (req, res) => {
            if (req.body.identifier.document) {
                res.status(200).json(
                    {
                        "document": [
                            {
                                "actor": {
                                    "_value": 1000040,
                                    "_ver": 1
                                },
                                "app": null,
                                "wf": {
                                    "_value": 10000007,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                },
                                "createdAt": '2021-09-23',
                                "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                            }
                        ],
                        "isDocument": true,
                        "isEvent": false,
                        "isThing": false
                    }
                ).end();
            } else if (req.body.identifier.event) {
                res.status(200).json(
                    {
                        "event": [
                            {
                                "actor": {
                                    "_value": 1000040,
                                    "_ver": 1
                                },
                                "app": null,
                                "wf": {
                                    "_value": 10000007,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                },
                                "createdAt": '2021-09-23',
                                "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                            }
                        ],
                        "isDocument": false,
                        "isEvent": true,
                        "isThing": false
                    }
                ).end();
            } else if (req.body.identifier.thing) {
                res.status(200).json(
                    {
                        "thing": [
                            {
                                "actor": {
                                    "_value": 1000040,
                                    "_ver": 1
                                },
                                "app": null,
                                "wf": {
                                    "_value": 10000007,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                },
                                "createdAt": '2021-09-23',
                                "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                            }
                        ],
                        "isDocument": false,
                        "isEvent": false,
                        "isThing": true
                    }
                ).end();
            }
        });
        this.app.post('/ctoken-ledger/count/', (req, res) => {
            res.status(200).json([
                {
                    "actor": {
                        "_value": 1000020
                    },
                    "app": null,
                    "wf": {
                        "_value": 1000020
                    },
                    "document": [
                        {
                            "_code": {
                                "_value": 1099999,
                                "_ver": 1
                            },
                            "count": 1
                        }
                    ],
                    "event": [
                        {
                            "_code": {
                                "_value": 1000008,
                                "_ver": 1
                            },
                            "count": 5
                        }
                    ],
                    "thing": [
                        {
                            "_code": {
                                "_value": 1000011,
                                "_ver": 1
                            },
                            "count": 20
                        }
                    ]
                },
                {
                    "actor": {
                        "_value": 1000020
                    },
                    "app": {
                        "_value": 1000020
                    },
                    "wf": null,
                    "document": [
                        {
                            "_code": {
                                "_value": 1099999,
                                "_ver": 1
                            },
                            "count": 1
                        }
                    ],
                    "event": [
                        {
                            "_code": {
                                "_value": 1000008,
                                "_ver": 1
                            },
                            "count": 5
                        }
                    ],
                    "thing": [
                        {
                            "_code": {
                                "_value": 1000011,
                                "_ver": 1
                            },
                            "count": 20
                        }
                    ]
                }
            ]).end();
        });
        this.port = 3008;
    }
}

export class StubCTokenLedgerServer1 extends BaseStubServer {
    constructor() {
        super();
        this.app.post('/ctoken-ledger/', (req, res) => {
            if (req.body.identifier.document) {
                res.status(200).json(
                    {
                        "document": [
                            {
                                "actor": {
                                    "_value": 1000040,
                                    "_ver": 1
                                },
                                "app": null,
                                "wf": {
                                    "_value": 10000007,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                },
                                "createdAt": '2021-09-23',
                                "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                            }
                        ],
                        "isDocument": true,
                        "isEvent": false,
                        "isThing": false
                    }
                ).end();
            } else if (req.body.identifier.event) {
                res.status(200).json(
                    {
                        "event": [
                            {
                                "actor": {
                                    "_value": 1000040,
                                    "_ver": 1
                                },
                                "app": null,
                                "wf": {
                                    "_value": 10000007,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                },
                                "createdAt": '2021-09-23',
                                "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                            }
                        ],
                        "isDocument": false,
                        "isEvent": true,
                        "isThing": false
                    }
                ).end();
            } else if (req.body.identifier.thing) {
                res.status(200).json(
                    {
                        "thing": [
                            {
                                "actor": {
                                    "_value": 1000040,
                                    "_ver": 1
                                },
                                "app": null,
                                "wf": {
                                    "_value": 10000007,
                                    "_ver": 1
                                },
                                "code": {
                                    "_value": 1000999,
                                    "_ver": 1
                                },
                                "createdAt": '2021-09-23',
                                "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                            }
                        ],
                        "isDocument": false,
                        "isEvent": false,
                        "isThing": true
                    }
                ).end();
            }
        });
        this.app.post('/ctoken-ledger/count', (req, res) => {
            res.status(200).json([
                {
                    "actor": {
                        "_value": 1000040
                    },
                    "app": null,
                    "wf": null,
                    "document": [
                        {
                            "_code": {
                                "_value": 1099999,
                                "_ver": 1
                            },
                            "count": 1
                        }
                    ],
                    "event": [
                        {
                            "_code": {
                                "_value": 1000008,
                                "_ver": 1
                            },
                            "count": 5
                        }
                    ],
                    "thing": [
                        {
                            "_code": {
                                "_value": 1000011,
                                "_ver": 1
                            },
                            "count": 20
                        }
                    ]
                }
            ]).end();
        });
        this.port = 3008;
    }
}

export class StubCTokenLedgerServer2 extends BaseStubServer {
    constructor() {
        super();
        this.app.post('/ctoken-ledger/', (req, res) => {
            res.status(200).json(
                {
                    "document": [
                        {
                            "actor": {
                                "_value": 1000040,
                                "_ver": 1
                            },
                            "app": null,
                            "wf": {
                                "_value": 10000007,
                                "_ver": 1
                            },
                            "code": {
                                "_value": 1000999,
                                "_ver": 1
                            },
                            "createdAt": '2021-09-23',
                            "identifier": 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                        }
                    ],
                    "isDocument": true,
                    "isEvent": false,
                    "isThing": false
                }
            ).end();
        });
        this.app.post('/ctoken-ledger/count', (req, res) => {
            res.status(200).json([
                {
                    "actor": {
                        "_value": 1000060
                    },
                    "app": null,
                    "wf": null,
                    "document": [
                        {
                            "_code": {
                                "_value": 1099999,
                                "_ver": 1
                            },
                            "count": 1
                        }
                    ],
                    "event": [
                        {
                            "_code": {
                                "_value": 1000008,
                                "_ver": 1
                            },
                            "count": 5
                        }
                    ],
                    "thing": [
                        {
                            "_code": {
                                "_value": 1000011,
                                "_ver": 1
                            },
                            "count": 20
                        }
                    ]
                }
            ]).end();
        });
        this.port = 3008;
    }
}

export class StubCTokenLedgerServer3 extends BaseStubServer {
    constructor() {
        super();
        this.app.post('/ctoken-ledger/', (req, res) => {
            res.status(200).json(
                {
                    "document": [],
                    "event": [],
                    "thing": [],
                    "isDocument": true,
                    "isEvent": true,
                    "isThing": true
                }
            ).end();
        });
        this.app.post('/ctoken-ledger/count', (req, res) => {
            res.status(200).json([
                {
                    "actor": {
                        "_value": 1000060
                    },
                    "app": null,
                    "wf": null,
                    "document": [
                        {
                            "_code": {
                                "_value": 1099999,
                                "_ver": 1
                            },
                            "count": 1
                        }
                    ],
                    "event": [
                        {
                            "_code": {
                                "_value": 1000008,
                                "_ver": 1
                            },
                            "count": 5
                        }
                    ],
                    "thing": [
                        {
                            "_code": {
                                "_value": 1000011,
                                "_ver": 1
                            },
                            "count": 20
                        }
                    ]
                }
            ]).end();
        });
        this.port = 3008;
    }
}

/**
 * ID Service サーバー
 */
export class StubIdServiceServer extends BaseStubServer {
    constructor(postCode: number, getCode: number, message: boolean = false) {
        super();
        this.app.post('/sso/UserInfoEndpoint/', (req, res) => {
            res.status(postCode);
            if (postCode === 200) {
                res.json({
                    sub: 'uuid-xxxxxxxx'
                });
            }
            if (postCode === 400 && message === true) {
                res.header('content-type: application/json');
                res.json([
                    {
                        message: '400エラーメッセージ'
                    }
                ]);
            }
            res.end();
            if (getCode === 503) {
                this.stop();
            }
        });

        this.app.get('/nc7000_3a_bo/users/uid', (req, res) => {
            res.status(getCode);
            if (getCode === 200) {
                res.json({
                    uid: 'pxr_user01'
                });
            }
            if (getCode === 400 && message === true) {
                res.header('content-type: application/json');
                res.json([
                    {
                        message: '400エラーメッセージ'
                    }
                ]);
            }
            res.end();
        });

        this.port = 5001;
    }

}
