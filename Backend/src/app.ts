import mongoose from 'mongoose';
import express from 'express';
import env from './components/dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from './components/session';

/* ROUTE */
import Auth from './routes/auth';

const app = express();
mongoose.connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`);

app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:5173' 
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session)

/* ROUTE */
app.get('/', (req, res) => res.send("Hello Synthia"))
app.use('/auth', Auth)

/* RUN */
app.listen(env.SERVER_PORT || 3000, () => console.log(`Server is running`))