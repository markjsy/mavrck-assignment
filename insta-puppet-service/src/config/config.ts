const dotenv = require('dotenv');

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'rabbitmq';
const SERVER_PORT = process.env.SERVER_PORT || 2000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER
};

export default config;
