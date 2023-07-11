import { Redeem } from "../models/req_models";
import {db} from '../db/db';
import { RowDataPacket } from "mysql2";
class HelperFunctions {
     async validateQuantityForHolder(redeem: Redeem): Promise<boolean | number> {
         try {
            const quantity = await this.getShares(redeem.holder_id);
            if (redeem.quantity > quantity) return false;
            return quantity;
         } catch (err) {
            console.log(err);
            throw err;
         }
    }

    async getShares(holder_id: number) {
      try {
         const get_shares = `SELECT * FROM shares WHERE holder_id = ?`;
         const values = [holder_id]
         const packet = await db.query(get_shares,values);
         const result = packet[0] as RowDataPacket;
         if (!result[0]) return false;
         return result[0]
      } catch (err) {
         console.log(err);
         throw err;
      }
    }

    async doesHolderExist(holder_id: number) {
      try {
         console.log(holder_id)
         const query = `SELECT * FROM holders WHERE holders.id = ${holder_id}`;
         const result = await db.query(query);
         const holder = result[0] as RowDataPacket;
         if (!holder[0]) return false;
         return holder[0];
      } catch (err) {
         console.log(err);
         throw err;
      }
    }
}

const helper_functions = new HelperFunctions();
export default helper_functions;