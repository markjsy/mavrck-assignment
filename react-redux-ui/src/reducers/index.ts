import { combineReducers } from "redux";
import { contentReducer } from "./contentReducer";
import { searchBarReducer } from './searchBarReducer';

const rootReducer = combineReducers({
    searchBarReducer: searchBarReducer,
    contentReducer: contentReducer

})

export default rootReducer
