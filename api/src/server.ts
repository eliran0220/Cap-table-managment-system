import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {connectToMySQL,initDb} from './db/db';
import { Express } from "express";
import bodyParser from "body-parser";
import holders_router from './routes/holders_router';
import shares_router from './routes/shares_router';
import {NotFound} from './utils/middlewares';
import { ErrorResponse } from './utils/error_wrapper';
class App {
    private readonly app: Express;
    constructor() {
        this.app = express();
        this.setConfig();
        this.initMiddelwares();
        this.initRouters();
        this.initErrorHandling();
    }

    private setConfig() {
        dotenv.config();
      }

    private initMiddelwares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(cors());
    }

    private initRouters() {
        this.app.use('/api',holders_router.router)
        this.app.use('/api',shares_router.router)

    }

    private initErrorHandling(): void {
        this.app.use(NotFound);
        this.app.use(ErrorResponse);
      }

    public async startServer() {
        await connectToMySQL();
        await initDb();
        this.app.listen(3000,'0.0.0.0', () => {
            console.log(`Server is listening on port 3000`)
        });
      }
}

const app = new App();
export default app;