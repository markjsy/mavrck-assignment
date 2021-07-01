import { searchBarActionConstants } from "../constants/actions/searchBarActionConstants";
import { ApplicationState, DropdownOptions } from "../interfaces/interface";
import { GET_INSTAGRAM_USER } from "../requests/httpMethods";
import { addUser, getAllUsers, getUserByUserName, Post, User } from "../requests/requests";

// import { GET_INSTAGRAM_USER } from "../requests/httpMethods";
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
        
        //const userDataResponse = await getUserByUserName(userName)
        const fakePosts: Post[] = [{
            commentCount: 123,
            likeCount: 553,
            mediaURL: "www.instagrame.com/fakeurl",
        },{
            commentCount: 123,
            likeCount: 553,
            mediaURL: "www.instagrame.com/fakeurl",
        },
        {
            commentCount: 123,
            likeCount: 553,
            mediaURL: "www.instagrame.com/fakeurl",
        },
        {
            commentCount: 123,
            likeCount: 553,
            mediaURL: "www.instagrame.com/fakeurl",
        }]
    
        const fakeUser: User = {
            userName: 'fakeUser7',
            fullName: 'fakeName'
        } 
        
        const userDataResponse = await addUser(fakeUser, fakePosts);
        const data = userDataResponse;
        
        console.log("Response after adding User", data)
        //const userInfoSource = await axios.get('https://www.instagram.com/mavrck/channel/__a=1')
        //const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
        //console.log( JSON.parse(jsonObject)) 

        //dispatch(setDropdownOptions([]))
    };
}