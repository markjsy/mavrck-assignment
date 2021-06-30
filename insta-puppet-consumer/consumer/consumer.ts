import amqplib from 'amqplib';
import { QUEUE, RABBIT_AMQP_URL } from '../config/rabbitmq';

async function consume(){

    const msg = { number: 5 };

    console.log(RABBIT_AMQP_URL)
    console.log(QUEUE)
    try {
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('puppet');

        channel.consume('puppet', (msg: any) => {
            console.log(msg.content.toString());
            channel.ack(msg)
        });

        console.log('Successfuly consumed message');
    } catch (ex) {

        console.error("An error occurred when connecting")
    }


} 

consume()

console.log("RUNNING CONSUMER")
