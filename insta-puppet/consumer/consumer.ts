import amqplib from 'amqplib';
import { RABBIT_AMQP_URL } from '../config/rabbitmq';

async function consume(){

    const msg = { number: 5 };
    try {
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('puppet');
        //channel.sendToQueue("puppet", Buffer.from(JSON.stringify(msg)))

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