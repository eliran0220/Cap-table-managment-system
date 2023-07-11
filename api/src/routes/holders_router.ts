import { Router } from 'express';
import errorWrapper from '../utils/error_wrapper';
import holdersController from '../controllers/holders_controller';

class HoldersRouter {
    public router = Router();

    constructor () {
        this.setRoutes();
    }

    private setRoutes() {
        this.router.post('/holder', errorWrapper(holdersController.addHolder));
        this.router.delete('/holder/:holderId',errorWrapper(holdersController.deleteHolder));
        this.router.get('/holder',errorWrapper(holdersController.getHolders));

    }
}

const holders_router = new HoldersRouter();
export default holders_router;
