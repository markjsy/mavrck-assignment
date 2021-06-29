import { combineReducers } from "redux";
import { searchBarReducer } from './searchBarReducer';

const rootReducer = combineReducers({
    searchBarReducer: searchBarReducer
})

export default rootReducer
