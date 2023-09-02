import express from 'express';
import connect from './components/mongo';
import env from './components/dotenv';

/* ROUTE */
import Auth from './routes/auth';

const app       = express();
app.locals.conn = connect();

app.use(express.json());
app.use('/auth', Auth)

app.get('/', (req, res) => res.send("Hello Synthia"))
app.listen(env.SERVER_PORT || 3000, () => console.log(`Server is running`))