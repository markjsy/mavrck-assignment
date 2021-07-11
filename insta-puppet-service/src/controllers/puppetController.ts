import { Request, Response, NextFunction } from 'express';
import logging from '../all-configs/logging';
import amqplib from 'amqplib';
import { CONFIG } from '../all-configs/config';

const NAMESPACE = 'Puppet Controller';
const addUserRabbitMQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const connection = await amqplib.connect(CONFIG.INSTA_PUPPET_SERVICE.RABBIT_AMQP_URL);
        const channel = await connection.createChannel();
        channel.sendToQueue('puppet', Buffer.from(JSON.stringify(req.body)));
        logging.info('Body of message sent to puppet service: ', JSON.stringify(req.body));
        logging.info(NAMESPACE, 'Sent to queue: ' + Buffer.from(JSON.stringify(req.body)));
    } catch (ex) {
        logging.error(NAMESPACE, 'An error occurred when connecting');
        logging.error(NAMESPACE, 'Could not connect to: ', CONFIG.INSTA_PUPPET_SERVICE.RABBIT_AMQP_URL);
    }
    return res.status(200).json({
        message: 'Successfully added a new user'
    });
};

const updateUserRabbitMQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const connection = await amqplib.connect(CONFIG.INSTA_PUPPET_SERVICE.RABBIT_AMQP_URL);
        const channel = await connection.createChannel();
        channel.sendToQueue('puppetUpdate', Buffer.from(JSON.stringify(req.body)));
        logging.info('Body of message sent to puppet service: ', JSON.stringify(req.body));
        logging.info(NAMESPACE, 'Sent to queue: ' + Buffer.from(JSON.stringify(req.body)));
    } catch (ex) {
        logging.error(NAMESPACE, 'An error occurred when connecting');
    }
    return res.status(200).json({
        message: 'Successfully added a new user'
    });
};
export default {
    addUserRabbitMQ,
    updateUserRabbitMQ
};
