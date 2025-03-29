import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import apirouter from './routes/api.js';
import uploadRouter from './routes/upload.js';
import extractRouter from './routes/extract.js';
import corsMiddleware from './middlewares/cors.js';
import lipidRouter from './routes/lipidProfile.js';

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();
const mongoURI = 'mongodb://localhost:27017/medinsight';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(corsMiddleware);
app.use(bodyParser.json());

// Routes
app.use('/api', apirouter);
app.use('/upload', uploadRouter);
app.use('/extract',extractRouter)
app.use('/lipid', lipidRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
