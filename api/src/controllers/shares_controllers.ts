import { Request, Response, NextFunction} from "express";
import shares_service from '../services/shares_service';
import { Allocation, Redeem } from "../models/req_models";
 class SharesController {
    async allocateShares(req: Request, res:Response, next: NextFunction) {
        try {
          const holder_id = req.params.holderId;
          const {quantity} = req.body ;
          const allocation : Allocation = {
            holder_id : Number(holder_id),
            quantity: quantity
          }
          const id = await shares_service.allocateShares(allocation)
          res.json(id)
        } catch (err) {
          console.log(err);
          next(err)
        }
      }

      async redeemShares(req: Request, res:Response, next: NextFunction) {
        try {
          const holder_id = req.params.holderId;
          const {quantity} = req.body;
          const redeem : Redeem = {
            holder_id : Number(holder_id),
            quantity: quantity
          }
          const result = await shares_service.redeemShares(redeem);
          res.json(result);
        } catch (err) {
          console.log(err);
          next(err)
        }
      }

}

const shares_controller = new SharesController();
export default shares_controller;
