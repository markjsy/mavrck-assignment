import { searchBarActionConstants } from "../constants/actions/searchBarActionConstants";
import { SearchBarActions, SearchBarReducer } from "../interfaces/interface";

const initialState: SearchBarReducer = {
    options: [],
    searchInput: ''
}

export function searchBarReducer(state = initialState, action: SearchBarActions) {
    switch (action.type) {
        case searchBarActionConstants.SET_DROPDOWN_OPTIONS:
            return { ...state, options: action.options };
        case searchBarActionConstants.SET_SEARCH_INPUT:
            return { ...state, searchInput: action.searchInput };
        default:
            return state;
    }
}