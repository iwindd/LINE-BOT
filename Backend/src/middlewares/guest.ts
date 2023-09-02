import {Request, Response, NextFunction} from 'express';

export default (req : Request, res : Response, next : NextFunction) => {
    if (req.session.auth){
        return res.sendStatus(403)
    }

    next()
}