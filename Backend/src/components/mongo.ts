import { MongoClient } from 'mongodb'
import env from './dotenv';

const url = `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`;

async function connectToMongoDB() {
    try {
        const client = new MongoClient(url);
        await client.connect();

        return client
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

export default connectToMongoDB
