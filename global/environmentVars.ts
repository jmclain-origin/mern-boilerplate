import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env.${process.env.NODE_ENV}` });

export default {
    NODE_ENV: !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV,
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 4000,
    MONGO_URI: process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://127.0.0.1:27017/boilerplate',
};
