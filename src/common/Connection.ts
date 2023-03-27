/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from './AppError';
import Config from './Config';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import CallerRole from '../repositories/postgres/CallerRole';
import TokenAccessHistory from '../repositories/postgres/TokenAccessHistory';
import TokenGenerationHistory from '../repositories/postgres/TokenGenerationHistory';
/* eslint-enable */

const config = Config.ReadConfig('./config/ormconfig.json');
const Message = Config.ReadConfig('./config/message.json');

// エンティティを設定
config['entities'] = [
    CallerRole,
    TokenAccessHistory,
    TokenGenerationHistory
];

/**
 * コネクションの生成
 */
export async function connectDatabase (): Promise<Connection> {
    let connection = null;
    try {
        // データベースに接続
        connection = await createConnection(config);
    } catch (err) {
        if (err.name === 'AlreadyHasActiveConnectionError') {
            // すでにコネクションが張られている場合には、流用する
            connection = getConnectionManager().get('postgres');
        } else {
            // エラーが発生した場合は、アプリケーション例外に内包してスローする
            throw new AppError(
                Message.FAILED_CONNECT_TO_DATABASE, 500, err);
        }
    }
    // 接続したコネクションを返却
    return connection;
}
