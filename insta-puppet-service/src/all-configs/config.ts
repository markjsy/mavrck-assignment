
export const CONFIG = {
    GRAPHQL: {
        GRAPHQL_PORT: process.env.GRAPHQL_PORT || 2500
    },

    INSTA_PUPPET_CONSUMER: {
        RABBIT_AMQP_URL: process.env.AMQP_HOST ? `${process.env.AMQP_HOST}` : 'amqp://guest:guest@localhost:5672/',
        QUEUE_NAME_ADD: process.env.QUEUE_NAME_ADD ? process.env.QUEUE_NAME_ADD : 'puppet',
        QUEUE_NAME_UPDATE: process.env.QUEUE_NAME_UPDATE ? process.env.QUEUE_NAME_UPDATE : 'puppetUpdate',
        GRAPHQL_URL: process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : 'http://localhost:2500/graphql'
    },

    INSTA_PUPPET_SERVICE: {
        IPS_PORT: process.env.IPS_PORT || 2000,
        HOSTNAME: process.env.SERVER_HOSTNAME || 'rabbitmq',
        RABBIT_AMQP_URL: process.env.AMQP_HOST ? `${process.env.AMQP_HOST}` : 'amqp://guest:guest@localhost:5672/',
        QUEUE_NAME_ADD: process.env.QUEUE_NAME_ADD ? process.env.QUEUE_NAME_ADD : 'puppet',
        QUEUE_NAME_UPDATE: process.env.QUEUE_NAME_UPDATE ? process.env.QUEUE_NAME_UPDATE : 'puppetUpdate'
    },

    REACT_REDUX_UI: {
        GRAPHQL_URL: process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : 'http://localhost:2500/graphql',
        GRAPHQL_SUB_URL: process.env.GRAPHQL_SUB_URL ? process.env.GRAPHQL_SUB_URL : 'ws://localhost:2500/subscriptions',
        PUPPET_URL_ADD: process.env.PUPPET_URL ? process.env.PUPPET_URL : 'http://localhost:2000/puppet/user',
        PUPPET_URL_UPDATE: process.env.PUPPET_URL_UPDATE ? process.env.PUPPET_URL_UPDATE : 'http://localhost:2000/puppet/userUpdate'
    }
};