import { MongoClient } from 'mongodb'
const url = 'mongodb://127.0.0.1:27017/synthia';

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
