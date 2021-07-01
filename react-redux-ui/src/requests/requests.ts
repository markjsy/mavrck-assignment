import { GET_ALL_USERS_QUERY, GET_USER_BY_USERNAME_QUERY } from "../constants/requests/searchBarRequestsConstants";
import { GRAPHQL } from "./httpMethods";

interface User {
    userName?: string
    fullName?: string
    biography?: string
    followerCount?: number
    retrievedAt?: Date
    posts?: Post[]
}

interface Post {
    likeCount?: number
    commentCount?: number
    postType?: string
    mediaURL?: string
    publishedAt?: Date
}

interface GetAllUsersResponse {
    getAllUsers: User[]
}


interface GetUserByUserNameResponse {
    getUserByUsername: User
}


export async function getAllUsers(): Promise<GetAllUsersResponse> {
    const response = await GRAPHQL(GET_ALL_USERS_QUERY);
    const data: GetAllUsersResponse = response.getAllUsers
    return data;
}


export async function getUserByUserName(userName: string): Promise<GetUserByUserNameResponse> {
    const response = await GRAPHQL(GET_USER_BY_USERNAME_QUERY(userName));
    const data: GetUserByUserNameResponse = response.getUserByUserName
    return data;
}

export async function addUser() {
    const response = await GRAPHQL(GET_ALL_USERS_QUERY);
    console.log("Response:   ");
    console.log(response);
    return response
}


