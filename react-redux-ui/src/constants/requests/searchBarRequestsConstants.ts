import { User, Post } from "../../interfaces/interface"

export const GET_ALL_USERS_QUERY = `
    { 
        getAllUsers
            {   
                id
                userName
                fullName
                biography
                followerCount
                retrievedAt
                posts {
                    id
                    likeCount
                    commentCount
                    postType
                    mediaURL
                    publishedAt
                }
            } 
    }
`

export const GET_USER_BY_USERNAME_QUERY = (userName: string): string => `
    { 
        getUserByUserName(userName: "${userName}")
            {
                id
                userName
                fullName
                biography
                followerCount
                retrievedAt
                posts {
                    id
                    likeCount
                    commentCount
                    postType
                    mediaURL
                    publishedAt
                }
            } 
    }
`

export const ADD_USER_MUTATION = (user: User, posts?: Post[]): string => {
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