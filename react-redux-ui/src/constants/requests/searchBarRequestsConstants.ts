export const GET_ALL_USERS_QUERY = `
    { 
        getAllUsers
            {
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

export const GET_USER_BY_USERNAME_QUERY = (userName: string) => `
    { 
        getUserByUserName(userName: "${userName}")
            {
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