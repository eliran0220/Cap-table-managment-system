import { Request, Response, NextFunction} from "express";
import holders_service from '../services/holders_service';
import { Holder } from "../models/req_models";
 class HoldersController {
    async addHolder(req: Request, res:Response, next: NextFunction) {
        try {
          const holder = req.body as Holder;
          const result = await holders_service.addHolder(holder)
          res.json(result)
        } catch (err) {
          console.log(err);
          next(err)
        }
      }

      async deleteHolder(req: Request, res:Response, next: NextFunction) {
        try {
          const holder_id = Number(req.params.holderId);
          const result = await holders_service.deleteHolder(holder_id);
          res.json(result);
        } catch (err) {
          console.log(err);
          next(err)
        }
      }

      async getHolders(req: Request, res:Response, next: NextFunction) {
        try {
          const reuslt = await holders_service.getHolders();
          res.json(reuslt);
        } catch (err) {
          console.log(err);
          next(err)
        }
      }
}

const holders_controller = new HoldersController();
export default holders_controller;
