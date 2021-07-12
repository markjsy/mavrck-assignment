require('dotenv').config();

const MAIN_HOSTNAME: string  = process.env.MAIN_HOSTNAME ? process.env.MAIN_HOSTNAME : `localhost`
export const CONFIG = {
    INSTA_PUPPET_SERVICE: {
        IPS_PORT: process.env.IPS_PORT || 2000,
        HOSTNAME: process.env.SERVER_HOSTNAME || `rabbitmq`,
        RABBIT_AMQP_URL: process.env.AMQP_HOST ? `${process.env.AMQP_HOST}` : `amqp://guest:guest@${MAIN_HOSTNAME}:5672/`,
        QUEUE_NAME_ADD: process.env.QUEUE_NAME_ADD ? process.env.QUEUE_NAME_ADD : `puppet`,
        QUEUE_NAME_UPDATE: process.env.QUEUE_NAME_UPDATE ? process.env.QUEUE_NAME_UPDATE : `puppetUpdate`
    }
};