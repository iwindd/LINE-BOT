import env from './dotenv';
import cors from 'cors';

export default cors({ 
    credentials: true, 
    origin: env.FRONTEND_URL
})