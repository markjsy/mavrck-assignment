import { Application, Request, Response, NextFunction, Router } from 'express';
import logging from '../config/logging';
import amqplib from 'amqplib';
import { RABBIT_AMQP_URL } from '../config/rabbitmq';

const NAMESPACE = 'Puppet Controller';

const addUserRabbitMQ = async (req: Request, res: Response, next: NextFunction) => {
    const msg = { number: 99 };
    try {
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('puppet');
        channel.sendToQueue("puppet", Buffer.from(JSON.stringify(msg)))

        /*
        channel.consume('puppet', (msg: any) => {
            console.log(msg.content.toString());
            channel.ack(msg)
        });
        */
        console.log('Successfuly consumed message');
    } catch (ex) {
        console.error("An error occurred when connecting")
    }


    return res.status(200).json({
        message: 'rabbit mq service'
    });
};

export default {
    addUserRabbitMQ
};
