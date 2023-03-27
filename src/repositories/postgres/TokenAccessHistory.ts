/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne
} from 'typeorm';
import TokenGenerationHistory from './TokenGenerationHistory';

@Entity('token_access_history')
export default class TokenAccessHistory extends BaseEntity {
    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** 作成履歴 */
    @Column({ type: 'bigint', nullable: false, default: false, name: 'created_history_id' })
    createdHistoryId: number;

    @Column({ type: 'varchar', nullable: false, name: 'api_token' })
    apiToken: string;

    @Column({ type: 'bigint', nullable: false, name: 'destination_block_catalog_code' })
    destinationBlockCatalogCode: number;

    @Column({ type: 'varchar', nullable: false, name: 'destination_api_url' })
    destinationApiUrl: string;

    @Column({ type: 'varchar', nullable: false, name: 'destination_api_method' })
    destinationApiMethod: string;

    @Column({ type: 'varchar', name: 'destination_user_id' })
    destinationUserId: string;

    @Column({ type: 'timestamp without time zone', nullable: false, name: 'expiration_at' })
    expirationAt: Date;

    @Column({ type: 'varchar' })
    parameter: string;

    @Column({ type: 'smallint' })
    status: number;

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

    @ManyToOne(
        type => TokenGenerationHistory,
        tokenGenerationHistory => tokenGenerationHistory.tokenAccessHistory
    )
    @JoinColumn({ name: 'created_history_id', referencedColumnName: 'id' })
    tokenGenerationHistory: TokenGenerationHistory;
}
