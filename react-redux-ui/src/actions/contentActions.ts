import { contentActionConstants } from '../constants/actions/contentActionConstants';

// import { GET_INSTAGRAM_USER } from "../requests/httpMethods";
export const contentActions = {
    setContent
};

function setContent(payload: any) {
    return {
        type: contentActionConstants.SET_CONTENT,
        payload: payload
    };
}
