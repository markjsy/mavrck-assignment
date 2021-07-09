import { CONFIG } from '../../../all-configs/config'

export function POST_PUPPET(payload: string) {
    return fetch(CONFIG.REACT_REDUX_UI.PUPPET_URL_ADD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(payload)
    })
        .catch((e) => {
            console.error('An error has occured: ' + e);
        });
}

export function UPDATE_PUPPET(payload: string) {
    return fetch(CONFIG.REACT_REDUX_UI.PUPPET_URL_UPDATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(payload)
    })
        .catch((e) => {
            console.error('An error has occured: ' + e);
        });
}

export function GET(url: string) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
        .then((r: any) => r.json())
        .catch((e) => {
            console.error('An error has occured: ' + e);
        });
}

export function GRAPHQL(query: string) {
    return fetch(CONFIG.REACT_REDUX_UI.GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ query: query })
    })
        .then((r: any) => r.json())
        .catch((e) => {
            console.error('An error has occured: ' + e);
        });
}
