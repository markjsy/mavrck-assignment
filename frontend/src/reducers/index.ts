import { combineReducers } from "redux";
import { SearchBarReducerState } from "../types/alltypes";
import { searchBarReducer } from './searchBarReducer';

export interface ApplicationState {
    searchBarReducer: SearchBarReducerState
}

const rootReducer = combineReducers({
    searchBarReducer: searchBarReducer
})

export default rootReducer
