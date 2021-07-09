import { ADD_USER_MUTATION, GET_ALL_USERS_QUERY, GET_USER_BY_USERNAME_QUERY } from '../constants/requests/searchBarRequestsConstants';
import { AddUserResponse, GetAllUsersResponse, GetUserByUserNameResponse, Post, User } from '../interfaces/interface';
import { GRAPHQL, POST_PUPPET, UPDATE_PUPPET } from './httpMethods';

export async function getAllUsers() {
    const response = await GRAPHQL(GET_ALL_USERS_QUERY);
    const data: GetAllUsersResponse = response.getAllUsers;
    return data;
}

export async function getUserByUserName(userName: string) {
    const response = await GRAPHQL(GET_USER_BY_USERNAME_QUERY(userName));
    const respData: GetUserByUserNameResponse = response && response.data? response.data : null;
    if (respData.getUserByUserName) {
        respData.getUserByUserName.posts?.sort((a: Post, b: Post) => {
            return new Date(a.publishedAt).valueOf() - new Date(b.publishedAt).valueOf();
        });
        return respData.getUserByUserName;
    } else {
        return null;
    }
}

export async function addUser(user: User, post?: Post[]) {
    const response = await GRAPHQL(ADD_USER_MUTATION(user, post));
    const data: AddUserResponse = response && response.data? response.data : null;
    return data;
}

export async function postToPuppet(payload: string) {
    const response = await POST_PUPPET(payload);
    const data: any = response;
    return data;
}

export async function updateToPuppet(payload: string) {
    const response = await UPDATE_PUPPET(payload);
    const data: any = response;
    return data;
}
