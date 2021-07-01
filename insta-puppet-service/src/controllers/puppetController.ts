import { Application, Request, Response, NextFunction, Router } from 'express';
import logging from '../config/logging';
import amqplib from 'amqplib';
import { RABBIT_AMQP_URL } from '../config/rabbitmq';

const NAMESPACE = 'Puppet Controller';

const addUserRabbitMQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();
        channel.sendToQueue('puppet', Buffer.from(JSON.stringify(req.body)) );

        logging.info("Body of message sent to puppet service: ", req.body)
        logging.info(NAMESPACE, "Sent to queue: " + Buffer.from(JSON.stringify(req.body)) );       
    } catch (ex) {
        logging.error(NAMESPACE, 'An error occurred when connecting');
    }
    return res.status(200).json({
        message: 'Successfully added a new user'
    });
};

export default {
    addUserRabbitMQ
};
