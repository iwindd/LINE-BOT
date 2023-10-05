import { ensureAll } from './api/main';

import mongoose from 'mongoose';
import express from 'express';
import env from './components/dotenv';
import bodyParser from 'body-parser';
import path from 'path';

/* COMPONENTS */
import session from './components/session';
import cors from './components/cors';

/* ROUTE */
import Auth from './routes/auth';
import App from './routes/app';
import Webhook from './routes/webhook';

/* MIDDLEWARE */

import AuthMiddleware from './middlewares/auth';

const app = express();
mongoose.connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session)
app.use(cors)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send("Hello Synthia"))
app.use('/auth', Auth)
app.use('/webhook', Webhook)
app.use('/app', AuthMiddleware, App)

app.listen(env.SERVER_PORT || 3000, () => console.log(`Server is running`))

if (env.APP_DEBUG) {
    ensureAll()
}