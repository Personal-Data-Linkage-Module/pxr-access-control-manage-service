/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { connectDatabase } from '../common/Connection';
import TokenGenerationHistory from './postgres/TokenGenerationHistory';
import CallerRole from './postgres/CallerRole';
import TokenAccessHistory from './postgres/TokenAccessHistory';
/* eslint-enable */

/**
 * 各エンティティ操作クラス
 */
export default class EntityOperation {
    /**
     * エンティティの紐づけデータごと、保存する
     * @param entity
     */
    static async saveEntity (entity: TokenGenerationHistory) {
        const connection = await connectDatabase();
        try {
            const repository = connection.getRepository(TokenGenerationHistory);
            const result = await repository.save(entity);
            for (const callerRole of entity.callerRole) {
                callerRole.createdHistoryId = result.id;
                await connection.getRepository(CallerRole).save(callerRole);
            }
            for (const tokenAccessHistory of entity.tokenAccessHistory) {
                tokenAccessHistory.createdHistoryId = result.id;
                await connection.getRepository(TokenAccessHistory).save(tokenAccessHistory);
            }
            return result;
        } finally {
            // await connection.close();
        }
    }
}
