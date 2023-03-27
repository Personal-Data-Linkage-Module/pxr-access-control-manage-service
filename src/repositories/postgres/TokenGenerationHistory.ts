/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    Entity
} from 'typeorm';
import CallerRole from './CallerRole';
import TokenAccessHistory from './TokenAccessHistory';

@Entity('token_generation_history')
export default class TokenGenerationHistory extends BaseEntity {
    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** 呼出元ブロックコード */
    @Column({ type: 'bigint', name: 'caller_block_catalog_code' })
    callerBlockCatalogCode: number;

    /** 呼び出し元API */
    @Column({ type: 'bigint', name: 'caller_api_url' })
    callerApiUrl: string;

    /** 呼び出しAPIコード */
    @Column({ type: 'varchar', name: 'caller_api_code' })
    callerApiCode: string;

    /** 呼び出し元HTTPメソッド */
    @Column({ type: 'bigint', name: 'caller_api_method' })
    callerApiMethod: string;

    /** 呼出元ワークフローカタログコード */
    @Column({ type: 'bigint', name: 'caller_workflow_catalog_code' })
    callerWorkflowCatalogCode: number;

    /** 呼出元ワークフローカタログバージョン */
    @Column({ type: 'bigint', name: 'caller_workflow_catalog_version' })
    callerWorkflowCatalogVersion: number;

    /** 呼出元アプリケーションカタログコード */
    @Column({ type: 'bigint', name: 'caller_application_catalog_code' })
    callerApplicationCatalogCode: number;

    /** 呼出元アプリケーションカタログバージョン */
    @Column({ type: 'bigint', name: 'caller_application_catalog_version' })
    callerApplicationCatalogVersion: number;

    /** 呼出元オペレーター種別 */
    @Column({ type: 'bigint', name: 'caller_operator_type' })
    callerOperatorType: number;

    /** 呼び出し元オペレーターID */
    @Column({ type: 'varchar', name: 'caller_operator_id' })
    callerOperatorId: number;

    /** PXR-ID */
    @Column({ type: 'varchar', name: 'pxr_id' })
    pxrId: string;

    @Column({ type: 'varchar', name: 'caller_user_id' })
    callerUserId: string;

    /** 一時コード */
    @Column({ type: 'varchar', name: 'temporary_code' })
    temporaryCode: string;

    /** 本人性確認コード */
    @Column({ type: 'varchar', name: 'identity_code' })
    identityCode: string;

    /** 無効フラグ */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /** 登録者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string = '';

    /** 登録日時 */
    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at', default: 'now()' })
    readonly createdAt!: Date;

    /** 更新者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string = '';

    /** 更新日時 */
    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at', onUpdate: 'now()' })
    readonly updatedAt!: Date;

    @OneToMany(
        type => CallerRole,
        callerRole => callerRole.tokenGenerationHistory
    )
    @JoinColumn({ name: 'id', referencedColumnName: 'createdHistoryId' })
    callerRole: CallerRole[];

    @OneToMany(
        type => TokenAccessHistory,
        tokenAccessHistory => tokenAccessHistory.tokenGenerationHistory
    )
    @JoinColumn({ name: 'id', referencedColumnName: 'createdHistoryId' })
    tokenAccessHistory: TokenAccessHistory[];
}
