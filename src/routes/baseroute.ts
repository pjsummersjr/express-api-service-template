import { NextFunction, Request, Response } from 'express';

export class BaseRoute {
    private title:string;
    
    constructor(){
        this.title = "Base Route";
    }

    public send(req: Request, res: Response, payload: string){
        res.send(JSON.parse(payload));
    }
}
