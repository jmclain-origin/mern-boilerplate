import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (_request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/api/test', (_request, response) => {
    response.json({ message: 'Hello World!' });
    response.end();
});

console.log('node environment: ' + process.env.NODE_ENV, process.env.TEST);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
