import puppeteer = require('puppeteer');
import fetch from 'node-fetch';
import { CONFIG } from '../all-configs/config';
require('dotenv').config();

export interface User {
    id?: number;
    userName?: string;
    fullName?: string;
    biography?: string;
    followerCount?: number;
    retrievedAt?: string;
    posts?: Post[];
}

export interface Post {
    id?: number;
    likeCount?: number;
    commentCount?: number;
    postType?: string;
    mediaURL?: string;
    mediaCode?: string;
    publishedAt: string;
}

const ADD_USER_MUTATION = (user: User, posts?: Post[]): string => {
    const userPosts = user.posts ? user.posts : null;
    const usedPosts = posts ? posts : userPosts;
    const parsedPost = JSON.stringify(usedPosts).replace(/"(\w+)":/g, '$1:');
    let mutation = `
        mutation{
            addUser(
                data: {
                userName: "${user.userName}"
                fullName: "${user.fullName}"
                biography: "${user.biography}"
                followerCount: ${user.followerCount}
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
    `;
    return mutation;
};

const UPDATE_USER_MUTATION = (user: User, posts?: Post[]): string => {
    const userPosts = user.posts ? user.posts : null;
    const usedPosts = posts ? posts : userPosts;
    const parsedPost = JSON.stringify(usedPosts).replace(/"(\w+)":/g, '$1:');
    let mutation = `
        mutation{
            updateUser(
                data: {
                userName: "${user.userName}"
                fullName: "${user.fullName}"
                biography: "${user.biography}"
                followerCount: ${user.followerCount}
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
    `;
    return mutation;
};

export function GRAPHQL(query: string) {
    return fetch(CONFIG.INSTA_PUPPET_CONSUMER.GRAPHQL_URL, {
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

export async function getUserInformation(user: string) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie: 'mid=YNIowAAEAAFvAh1Ftbth18N8U2LP; ig_did=63C43336-6210-4709-8DF5-88A047AB54B5; ig_nrcb=1; datr=cnXWYLLfwBBrm5sIbUI3xlkP; shbid=19751; shbts=1625453571.8652658; rur=ASH; csrftoken=x8tlK5wxt4bi2PkCSX5UyaUPqyzEHrQr; ds_user_id=5779623888; sessionid=5779623888:HEcTiImTNnPWwV:14'
    });

    await page.goto(`https://instagram.com/${user}/channel/?__a=1`);
    //  await page.screenshot({path: './screenshot123.png'})
    const element = await page.$('pre');
    const text = await page.evaluate((element) => element.textContent, element);
    await browser.close();
    return text;
}

export async function addUser(user: User, post?: Post[]) {
    const response = await GRAPHQL(ADD_USER_MUTATION(user, post));
    const data = response.data;
    return data;
}

export async function updateUser(user: User, post?: Post[]) {
    const response = await GRAPHQL(UPDATE_USER_MUTATION(user, post));
    const data = response.data;
    return data;
}
