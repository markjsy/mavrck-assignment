import amqplib from 'amqplib';
import { QUEUE_NAME, RABBIT_AMQP_URL } from '../config/rabbitmq';
import { getUserInformation } from './puppet';

async function consume(){
    try {
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();

        // Waits to consume from rabbit message queue
        channel.consume(QUEUE_NAME, async (msg: any) => {
            console.log("The QUEUE: ", QUEUE_NAME)
            console.log("The MESSAGE: ", msg.content)
            
            const parsedMsg: any = JSON.parse(msg.content)
            const username: string = Object.keys(parsedMsg)[0];
            const usernameProcessed: string = username.substring(1,username.length-1);
            const userData = await getUserInformation(usernameProcessed)
            const userDataParsed = JSON.parse(userData)

            console.log("User Information from Instagram: ", userDataParsed)

            // Acknowledges message as completed by consumer
            channel.ack(msg)
        });

        console.log('Successfuly consumed message');
    } catch (ex) {
        console.error("Consumer: Error occurred when connecting")
    }
} 
console.log("RUNNING CONSUMER")
consume()
