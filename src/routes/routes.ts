import {NextFunction, Request, Response, Router } from 'express';
import {BaseRoute} from './baseroute';

export class FirstRoute extends BaseRoute {

    public static create(router: Router) {
        console.log('Creating router');

        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new FirstRoute().route(req, res, next);
        })
    }

    constructor(){
        super();
    }

    public route(req: Request, res: Response, next: NextFunction):void {
        res.send('{"something":"something else"}');
    } 
}


