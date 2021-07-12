
require('dotenv').config();
const REACT_APP_MAIN_HOSTNAME: string  = process.env.REACT_APP_MAIN_HOSTNAME ? process.env.REACT_APP_MAIN_HOSTNAME : `localhost`

export const CONFIG = {
    REACT_REDUX_UI: {
        GRAPHQL_URL: process.env.GRAPHQL_URL ? process.env.GRAPHQL_URL : `http://${REACT_APP_MAIN_HOSTNAME}:2500/graphql`,
        GRAPHQL_SUB_URL: process.env.GRAPHQL_SUB_URL ? process.env.GRAPHQL_SUB_URL : `ws://${REACT_APP_MAIN_HOSTNAME}:2500/subscriptions`,
        PUPPET_URL_ADD: process.env.PUPPET_URL ? process.env.PUPPET_URL : `http://${REACT_APP_MAIN_HOSTNAME}:2000/puppet/user`,
        PUPPET_URL_UPDATE: process.env.PUPPET_URL_UPDATE ? process.env.PUPPET_URL_UPDATE : `http://${REACT_APP_MAIN_HOSTNAME}:2000/puppet/userUpdate`
    }
};