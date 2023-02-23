import path from 'path';
import express from 'express';
import environmentVars from '@global/environmentVars';
import { connectDB } from './db.config';

type ProcVars = typeof environmentVars;

const { PORT, NODE_ENV }: ProcVars = environmentVars;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get('/api/test', (_request, response) => {
    response.json({ message: 'Hello World!' });
    response.end();
});

if (NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.get('/', (_request, response) => {
        response.sendFile(__dirname + '/index.html');
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
