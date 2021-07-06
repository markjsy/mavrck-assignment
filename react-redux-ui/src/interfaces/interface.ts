

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

export interface GetAllUsersResponse {
    getAllUsers: User[]
}

export interface GetUserByUserNameResponse {
    getUserByUserName: User
}

export interface AddUserResponse {
    addUser: User
}

export interface DropdownOptions {
    title: string
}

export interface SearchBarOptions{
    title: string
}

export interface SearchBarReducer{
    options: SearchBarOptions[]
    searchInput: string
}

export interface Actions{
    type: string
    payload: any;
}

export interface SearchBarActions{
    type: string
    searchInput: string
    options: SearchBarOptions[]
}

export interface ContentActions{
    type: string
    payload: any;
}


export interface ContentReducer{
    userName: string;
    fullName: string;
    biography: string;
    followerCount: number;
    retrievedAt: string;
    posts: Post[];
}

export interface ApplicationState {
    searchBarReducer: SearchBarReducer
    contentReducer: ContentReducer
}
