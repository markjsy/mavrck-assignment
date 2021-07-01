import { ADD_USER_MUTATION, GET_ALL_USERS_QUERY, GET_USER_BY_USERNAME_QUERY } from "../constants/requests/searchBarRequestsConstants";
import { GRAPHQL } from "./httpMethods";

export interface User {
    id?: number,
    userName?: string
    fullName?: string
    biography?: string
    followerCount?: number
    retrievedAt?: Date
    posts?: Post[]
}

export interface Post {
    id?: number
    likeCount?: number
    commentCount?: number
    postType?: string
    mediaURL?: string
    publishedAt?: Date
}

/*

export interface PostRequest{
    likeCount?: number;
    commentCount?: number;
    mediaURL?: string;
    publishedAt?: Date
}

export interface UserRequest{
    userName: string;
    fullName?: string;
    biography?: string;
    followerCount?: number;
    posts: PostRequest[]; 
}

*/

interface GetAllUsersResponse {
    getAllUsers: User[]
}

interface GetUserByUserNameResponse {
    getUserByUsername: User
}

interface AddUserResponse {
    addUser: User
}

export async function getAllUsers(): Promise<GetAllUsersResponse> {
    const response = await GRAPHQL(GET_ALL_USERS_QUERY);
    const data: GetAllUsersResponse = response.getAllUsers
    return data;
}


export async function getUserByUserName(userName: string): Promise<GetUserByUserNameResponse> {
    const response = await GRAPHQL(GET_USER_BY_USERNAME_QUERY(userName));
    const data: GetUserByUserNameResponse = response.data
    return data;
}


export async function addUser(user: User, post?: Post[]): Promise<AddUserResponse> {
    const response = await GRAPHQL(ADD_USER_MUTATION(user,post));
    const data: AddUserResponse = response.data
    return data;
}

