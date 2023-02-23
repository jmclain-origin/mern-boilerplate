import mongoose from 'mongoose';

const config = process.env;

export const connectDB = async (): Promise<void> => {
    try {
        const dbUrl = config.MONGO_URI as string;

        // if (config.NODE_ENV === 'test') {
        //     mongoDB = await MongoMemoryServer.create();
        //     dbUrl = mongoDB.getUri();
        // }
        mongoose.set('strictQuery', true);

        const conn = await mongoose.connect(dbUrl);

        if (config.NODE_ENV !== 'test') console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        if (config.NODE_ENV !== 'test') {
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
