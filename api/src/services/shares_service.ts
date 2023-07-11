import { RowDataPacket } from 'mysql2';
import {db} from '../db/db';
import { Allocation, Redeem } from '../models/req_models';
import helper_functions from '../db/helper_functions';
import { ApiResponse } from '../models/res_models';
class SharesService {
    async allocateShares(allocation : Allocation) {
        let response: ApiResponse<number>;
        try {
            const isHolder = await helper_functions.doesHolderExist(allocation.holder_id);
            if (!isHolder) {
                return response = {
                    success: false,
                    data: allocation.holder_id,
                    message: `Holder with id: ${allocation.holder_id} doesn't exists!`
                }
            } 
            const values = [allocation.holder_id,allocation.quantity]
            const query = `INSERT INTO shares (holder_id,quantity) VALUES (?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ${allocation.quantity}`;
            await db.query(query,values);
            return response = {
                success: true,
                data: allocation.holder_id,
                message: `Allocated ${allocation.quantity} to holder ${allocation.holder_id}`
            }
        } catch (err) {
            console.log(err);
        }
      }

      async redeemShares(redeem : Redeem) {
        try {
            let response : ApiResponse<number>;
            const packet = await helper_functions.getShares(redeem.holder_id);
            const available_shares = (packet as RowDataPacket).quantity;
            if (!available_shares) {
                return response = {
                    success: false,
                    data: redeem.holder_id,
                    message: 'No shares for this holder found'
                };
            }
            console.log(`available shares: ${available_shares}`)
            if (redeem.quantity > available_shares || available_shares <=0) {
                return response = {
                    success: false,
                    data: redeem.holder_id,
                    message: `Not enought shares! have ${available_shares}`
                };
            }
            const query = `UPDATE shares s SET s.quantity = s.quantity - ${redeem.quantity} WHERE s.holder_id = ${redeem.holder_id}`;
            await db.query(query);
            return response = {
                success: true,
                data: redeem.holder_id,
                message: `Redeemed ${redeem.quantity} shares!`
            };
        } catch (err) {
            console.log(err);
        }
      }
}

const shares_service = new SharesService();
export default shares_service;

