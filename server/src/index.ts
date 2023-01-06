import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/test', (_req, res) => {
    res.json({ message: 'Hello World!' });
    res.end();
});

console.log('node env', process.env.NODE_ENV);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
