import session, { SessionOptions } from 'express-session';

const options: SessionOptions = {
    secret: "",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}

export default session(options)