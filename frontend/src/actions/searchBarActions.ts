import { searchBarConstants } from "../constants/searchBarConstants";
interface DropdownOptions {
    title: string
}

export const searchBarActions = {
    setDropdownOptions,
    setSearchInput
}

function setDropdownOptions(options: DropdownOptions[]) {
    return { type: searchBarConstants.SET_DROPDOWN_OPTIONS, options }
}

function setSearchInput(searchInput: string) {
    return { type: searchBarConstants.SET_SEARCH_INPUT, searchInput }
}