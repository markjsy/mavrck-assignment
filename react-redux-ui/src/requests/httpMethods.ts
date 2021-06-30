const GRAPHQL_URL = 'http://rabbitmq:3000/graphql'
const INSTAGRAM_URL = 'https://www.instagram.com'


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

export function GET_INSTAGRAM_USER(user: string) {
    return fetch(INSTAGRAM_URL + `/mavrck/channel/?__a=1`, {
        method: 'GET',
        headers: {

            'accept': `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
            'sec-ch-ua-mobile': `?0`,
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36`

        }

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