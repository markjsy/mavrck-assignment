import puppeteer = require('puppeteer');
import * as fetch from 'node-fetch';

export const GRAPHQL_URL = process.env.GRAPHQL_URL ? 
process.env.GRAPHQL_URL:'http://localhost:2500/graphql'

export interface User {
    id?: number
    userName?: string
    fullName?: string
    biography?: string
    followerCount?: number
    retrievedAt?: string
    posts?: Post[]
}

export interface Post {
    id?: number
    likeCount?: number
    commentCount?: number
    postType?: string
    mediaURL?: string
    mediaCode?: string
    publishedAt: string
}

const ADD_USER_MUTATION = (user: User, posts?: Post[]): string => {
    const userPosts = user.posts ? user.posts : null
    const usedPosts = posts ? posts : userPosts
    const parsedPost = JSON.stringify(usedPosts).replace(/"(\w+)":/g, '$1:'); 
    let mutation = `
        mutation{
            addUser(
                data: {
                userName: "${user.userName}"
                fullName: "${user.fullName || null}"
                biography: "${user.biography || null}"
                followerCount: ${user.followerCount || null}
                posts: ${parsedPost}
                }
            ) {
                id
                userName
                fullName
                biography
                followerCount
                posts {
                id
                likeCount
                commentCount
                mediaURL
                publishedAt
                }
            }
        }
    `
    return mutation
}

export function GRAPHQL(query: string) {
    console.log("GRAPHQL_URL: ", GRAPHQL_URL)
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

export async function getUserInformation(user: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    });

    await page.goto(`https://instagram.com/${user}/channel/?__a=1`);
    const element = await page.$('pre');
    const text = await page.evaluate((element) => element.textContent, element);
    //console.log(text)
    await browser.close();
    return text;
}


export async function addUser(user: User, post?: Post[]) {
    const response = await GRAPHQL(ADD_USER_MUTATION(user, post));
    const data = response.data
    return data;
}
