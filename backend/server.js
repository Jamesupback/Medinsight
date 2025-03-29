import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apirouter from './routes/api.js';
import uploadRouter from './routes/upload.js';
import corsMiddleware from './middlewares/cors.js';

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(bodyParser.json());

// Routes
app.use('/api', apirouter);
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
