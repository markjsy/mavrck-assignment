import express = require('express');
import http = require('http');
import logging from './all-configs/logging';
import { CONFIG } from './all-configs/config';
require('dotenv').config();

const sample = require('./routes/sampleRoute');
const puppet = require('./routes/puppetRoute');

const NAMESPACE = 'Server';
const app = express();

app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP[${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP[${req.socket.remoteAddress}], STATUS - [${res.statusCode}] `);
    });
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*API Rules */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/* Routes */
app.use('/sample', sample);
app.use('/puppet', puppet);

/* Error Handling*/
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);
httpServer.listen(CONFIG.INSTA_PUPPET_SERVICE.IPS_PORT, () => logging.info(NAMESPACE, `Server running on ${CONFIG.INSTA_PUPPET_SERVICE.HOSTNAME}:${CONFIG.INSTA_PUPPET_SERVICE.IPS_PORT}`));
