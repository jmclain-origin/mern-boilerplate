import mongoose from 'mongoose';
import environmentVars from '@global/environmentVars';

const { MONGO_URI, NODE_ENV }: typeof environmentVars = environmentVars;

export const connectDB = async (): Promise<void> => {
    try {
        const dbUrl = MONGO_URI as string;

        // if (NODE_ENV === 'test') {
        //     mongoDB = await MongoMemoryServer.create();
        //     dbUrl = mongoDB.getUri();
        // }
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
        // if (mongoDB) {
        //     await mongoDB.stop();
        // }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
// https://open.spotify.com/playlist/5P2P8t6rTGutdEpuOAdu9C?si=60ba68cd3e4d4a4c
