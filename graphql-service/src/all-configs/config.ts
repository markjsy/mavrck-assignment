
require('dotenv').config();
const MAIN_HOSTNAME: string  = process.env.MAIN_HOSTNAME ? process.env.MAIN_HOSTNAME : `localhost`
export const CONFIG = {
    GRAPHQL: {
        GRAPHQL_PORT: process.env.GRAPHQL_PORT || 2500
    }
};