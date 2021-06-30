import { Application, Request, Response, NextFunction, Router } from 'express';
import express = require('express');
import http = require('http');
import bodyParser = require('body-parser');
import logging from './config/logging';
import config from './config/config';

const sample = require('./routes/sampleRoute');
const puppet = require('./routes/puppetRoute');

const NAMESPACE = 'Server';
const app = express();
let router = express.Router();

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
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
/*
app.post('/addUser', async function (req: any, res: any) {
    console.log(req)
    // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
    const text = await getUserInformation(req)
    res.send(text);


    const query = `
    query {
        getAllUsers {
          id
          userName
        }
    }
    `;

    const result = await fetch('http://rabbitmq:3100/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: query })
    })

    const users = await result.text()
    console.log(users)


});

*/
