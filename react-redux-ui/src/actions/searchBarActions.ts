import { searchBarActionConstants } from "../constants/actions/searchBarActionConstants";
import { DropdownOptions } from "../interfaces/interface";

// import { GET_INSTAGRAM_USER } from "../requests/httpMethods";
export const searchBarActions = {
    setDropdownOptions,
    setSearchInput,
    thunkTest
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

function thunkTest() {
    return async (dispatch: any, _getState: any) => {
        //const _state: ApplicationState = getState();
        //const userDataResponse = await GET_INSTAGRAM_USER("mavrck")
        //const data = userDataResponse
        //const userInfoSource = await axios.get('https://www.instagram.com/mavrck/channel/__a=1')
        //const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
        //console.log( JSON.parse(jsonObject)) 

        //dispatch(setDropdownOptions([]))
    };
}