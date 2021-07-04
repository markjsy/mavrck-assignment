import { searchBarActionConstants } from "../constants/actions/searchBarActionConstants";
import { contentActions } from "./contentActions"
import { ApplicationState, DropdownOptions } from "../interfaces/interface";
import { getUserByUserName, postToPuppet} from "../requests/requests";

export const searchBarActions = {
    setDropdownOptions,
    setSearchInput,
    searchThunk
}

function setDropdownOptions(options: DropdownOptions[]) {
    return {
        type: searchBarActionConstants.SET_DROPDOWN_OPTIONS,
        options: options
    }
}

function setSearchInput(searchInput: string) {
    return {
        type: searchBarActionConstants.SET_SEARCH_INPUT,
        searchInput: searchInput
    }
}

function searchThunk() {
    return async (dispatch: any, getState: any) => {
        const state: ApplicationState = getState();
        const userName: string = state.searchBarReducer.searchInput
        const userDataResponse = await getUserByUserName(userName)

        if(userDataResponse === null){
            postToPuppet(userName)
        }
        dispatch(contentActions.setContent(userDataResponse))

        console.log("userDataResponse", userDataResponse)
    };
}
