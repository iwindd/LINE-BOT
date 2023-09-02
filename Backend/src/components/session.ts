import session, { SessionOptions } from 'express-session';
import env from '../components/dotenv'
import { IUser } from '../models/UserModel';

const options: SessionOptions = {
    secret: env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}

declare module 'express-session' {
    export interface SessionData {
        auth: IUser | null;
    }
}

export default session(options)