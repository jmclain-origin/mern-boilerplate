import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import environmentVars from '@global/environmentVars';

const { MONGO_URI, NODE_ENV }: typeof environmentVars = environmentVars;

let mongoDB: MongoMemoryServer | null = null;
export const connectDB = async (): Promise<void> => {
    try {
        let dbUrl = MONGO_URI;

        if (NODE_ENV === 'test') {
            mongoDB = await MongoMemoryServer.create();
            dbUrl = mongoDB.getUri();
        }
        mongoose.set('strictQuery', true);

        const conn = await mongoose.connect(dbUrl);

        if (NODE_ENV !== 'test') console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        if (NODE_ENV !== 'test') {
            console.error(err);
            process.exit(1);
        } else throw err;
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.connection.close();
        if (mongoDB) {
            await mongoDB.stop();
        }
    } catch (err) {
        if (NODE_ENV !== 'test') {
            console.log(err);
            process.exit(1);
        } else throw err;
    }
};

export const clearDB = async (): Promise<void> => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    } catch (err) {
        if (NODE_ENV !== 'test') {
            console.log(err);
            process.exit(1);
        } else throw err;
    }
};
