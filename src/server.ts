import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as http from 'http';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import {FirstRoute} from './routes/routes';

export default class Server {
    public app: express.Application;
    private httpServer: http.Server;

    public bootstrap(httpPort: string | number) {
        
        this.app.set("port", httpPort);
        this.httpServer = http.createServer(this.app);

        this.httpServer.listen(httpPort);

        this.httpServer.on("error", this.onError);
        this.httpServer.on("listening", this.onListening);
    }

    constructor() {
        this.app = express();

        this.config();

        this.routes();

        this.api();
        this.onListening = this.onListening.bind(this);
        this.onError = this.onError.bind(this);
    }

    public api(): void {

    }

    public config(): void {
        this.app.use(express.static(path.join(__dirname,"public")));

        this.app.use(logger("dev"));

        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(methodOverride());

        this.app.use(function(err: any, req:express.Request, res: express.Response, next: express.NextFunction){
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        FirstRoute.create(router);
        this.app.use(router);
    }

    protected onError(error) {
        if(error.syscall !== "listen"){
            throw error;
        }
        let port = this.httpServer.address();
        var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    
        switch(error.code) {
            case "EACCES":
                console.error("Eleveted privileges required");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error("Port already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    
    protected onListening() {
        let addr = this.httpServer.address();
        let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        console.log("Listening on " + bind);
    }
}