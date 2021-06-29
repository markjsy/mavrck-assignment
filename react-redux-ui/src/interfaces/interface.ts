

export interface DropdownOptions {
    title: string
}

export interface SearchBarOptions{
    title: string
}

export interface SearchBarReducer{
    options: SearchBarOptions[]
    searchInput: string
}

export interface SearchBarActions{
    type: string
    searchInput: string
    options: SearchBarOptions[]
}

export interface ApplicationState {
    searchBarReducer: SearchBarReducer
}
