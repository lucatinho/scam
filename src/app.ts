import express from 'express';
import http from 'http';
import cors from 'cors';
import rastreiosRoutes from "./routes/RastreiosRoutes";

import * as dotenv from 'dotenv';

class App {
    public express: express.Application;
    public serverHttp: http.Server;

    public constructor() {
        dotenv.config();
        this.express = express();
        this.serverHttp = http.createServer(this.express);
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors({
            origin: '*'
        }));
    }

    private routes(): void {
        this.express.use([
            rastreiosRoutes
        ]);
    }
}

const app = new App();

export {app};
