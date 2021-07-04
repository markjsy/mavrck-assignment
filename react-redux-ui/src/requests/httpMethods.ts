import { GRAPHQL_URL, PUPPET_URL } from "../constants/requests/httpMethodsConstants"

export function POST_PUPPET(payload: string) {
    return fetch(PUPPET_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(payload)
    })
}

export function GET(url: string) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then((r: any) => r.json())
        .catch((e) => {
            console.error("An error has occured: " + e)
        })
}

export function GRAPHQL(query: string) {
    return fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: query })
    })
        .then((r: any) => r.json())
        .catch((e) => {
            console.error("An error has occured: " + e)
        })
}