import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ollama from 'ollama'
import apirouter from './routes/api.js';
import os from 'os';

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address; // Returns something like 192.168.1.33
            }
        }
    }
    return "127.0.0.1"; // Fallback to localhost
}

const PORT = 5000;
const HOST = '0.0.0.0'; // Allows connections from other devices on the network

const app = express();
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(bodyParser.json());

app.use('/api', apirouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});