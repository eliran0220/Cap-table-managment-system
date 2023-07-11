import { Router } from 'express';
import errorWrapper from '../utils/error_wrapper';
import shares_controller from '../controllers/shares_controllers';

class SharesRouter {
    public router = Router();

    constructor () {
        this.setRoutes();
    }

    private setRoutes() {
        this.router.put('/allocate/:holderId',errorWrapper(shares_controller.allocateShares))
        this.router.put('/redeem/:holderId',errorWrapper(shares_controller.redeemShares));
    }
}

const holders_router = new SharesRouter();
export default holders_router;
