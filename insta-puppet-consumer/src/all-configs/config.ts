
require('dotenv').config();
const MAIN_HOSTNAME: string  = process.env.MAIN_HOSTNAME ? process.env.MAIN_HOSTNAME : `localhost`

export const CONFIG = {
    INSTA_PUPPET_CONSUMER: {
        RABBIT_AMQP_URL: process.env.AMQP_HOST ? `${process.env.AMQP_HOST}` : `amqp://guest:guest@localhost:5672/`,
        QUEUE_NAME_ADD: process.env.QUEUE_NAME_ADD ? process.env.QUEUE_NAME_ADD : `puppet`,
        QUEUE_NAME_UPDATE: process.env.QUEUE_NAME_UPDATE ? process.env.QUEUE_NAME_UPDATE : `puppetUpdate`,
        GRAPHQL_URL: process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : `http://${MAIN_HOSTNAME}:2500/graphql`
    }
};