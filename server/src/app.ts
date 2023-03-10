import path from 'path';
import express from 'express';
import environmentVars from '@global/environmentVars';

import { connectDB } from './services/db.config';
import v1Routes from './api/v1/routes';

const { NODE_ENV }: typeof environmentVars = environmentVars;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/api/v1', v1Routes);

if (NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.get('/', (_request, response) => {
        response.sendFile(__dirname + '/index.html');
    });
}

export default app;
