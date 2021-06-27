
export interface SearchBarOptions{
    title: string
}

export interface SearchBarReducerState{
    options: SearchBarOptions[]
    searchInput: string
}

export interface SearchBarActions{
    type: string
    searchInput: string
    options: SearchBarOptions[]
}