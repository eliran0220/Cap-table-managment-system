import { RowDataPacket } from 'mysql2';
import {db} from '../db/db';
import { Holder } from '../models/req_models';
import helper_functions from '../db/helper_functions';
import { ApiResponse } from '../models/res_models';
class HoldersService {
    async addHolder(holder : Holder) {
        try {
            let values = [holder.name]
            let query = `INSERT INTO holders (name) VALUES (?)`;
            const result = await db.query(query,values);
            const id = (result[0] as RowDataPacket).insertId;
            query = `INSERT INTO shares (holder_id) VALUES (?)`;
            values = [id]
            await db.query(query,values);
            console.log(`Id ${id} created!`)
            const response : ApiResponse<number> = {
                success: true,
                data: id,
                message: `Id ${id} created!`
            }
            return response;
        } catch (err) {
            console.log(err);
        }
      }

      async deleteHolder(holder_id: number) {
        let response : ApiResponse<number>;
        try {
            const isHolder = await helper_functions.doesHolderExist(holder_id);
            if (!isHolder) {
                return response = {
                    success: false,
                    data: holder_id,
                    message: `Holder with id: ${holder_id} doesn't exists`
                }
            }
            const available_shares = await helper_functions.getShares(holder_id);
            if (!available_shares || available_shares.quantity === 0) {
                let query = `DELETE FROM shares where holder_id = ${holder_id}`;
                await db.query(query);
                query = `DELETE FROM holders where id = ${holder_id}`;
                await db.query(query);
                return response = {
                    success: true,
                    data: holder_id,
                    message: `Holder with id: ${holder_id} has been deleted!`
                }
            }
            if (available_shares.quantity > 0) {
                return response = {
                    success: false,
                    data: holder_id,
                    message: `Holder with id: ${holder_id} doesn't have enough shares.`
                }
            }
        } catch (err) {
            console.log(err);
            throw err;
        }

      }

      async getHolders() {
        try {
            const query = `SELECT h.id, h.name, s.quantity
            FROM holders h
            LEFT JOIN shares s ON h.id = s.holder_id;`
            const packet = await db.query(query);
            const result = (packet[0] as RowDataPacket);
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
      }
}

const holders_service = new HoldersService();
export default holders_service;