import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = process.env.HOST || '0.0.0.0'
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, host, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});