import { contentActionConstants } from "../constants/actions/contentActionConstants";
import { Actions, ContentActions, ContentReducer } from "../interfaces/interface";

const initialState: ContentReducer = {
    fullName: 'No name found',
    biography: 'No biography found',
    followerCount: 0,
    posts: [{
        mediaURL: 'No media URL found',
        likeCount: 0,
        commentCount: 0,
        postType: 'No post type found',
        publishedAt: ''
    }]
}

export function contentReducer(state = initialState, action: ContentActions) {
    switch (action.type) {
        case contentActionConstants.SET_CONTENT:
            if (action.payload === null) {
                return { ...initialState }
            }
            else {
                return { ...state, ...action.payload };
            }
        default:
            return state;
    }
}