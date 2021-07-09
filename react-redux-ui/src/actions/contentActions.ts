import { contentActionConstants } from '../constants/actions/contentActionConstants';

export const contentActions = {
    setContent
};

function setContent(payload: any) {
    return {
        type: contentActionConstants.SET_CONTENT,
        payload: payload
    };
}
