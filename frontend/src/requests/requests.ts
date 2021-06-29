import { GET_ALL_USERS } from "../constants/requests/searchBarRequestsConstants";
import { GRAPHQL } from "./httpMethods";

interface User{
    userName?: string
    fullName?: string 
    biography?: string 
    followerCount?: number
    retrievedAt?: Date
    posts?: Post[]
}

interface Post{
    likeCount?: number
    commentCount?: number
    postType?: string
    mediaURL?: string
    publishedAt?: Date
}

interface GetAllUsersResponse{
    getAllUsers: User[]
}

export async function getAllUsers(): Promise<GetAllUsersResponse> {
    const response = await GRAPHQL(GET_ALL_USERS);
    const data:GetAllUsersResponse = response.data
    return data;
}

export async function addUser() {
    const response = await GRAPHQL(GET_ALL_USERS);
    console.log("Response:   ");
    console.log(response);
    return response
}


