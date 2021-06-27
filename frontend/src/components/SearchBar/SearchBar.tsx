import { ChangeEvent, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchBarOptions } from '../../types/alltypes';
import './SearchBar.scss';
//Default props
const defaultSearchBarProps = {}

type SearchBarProps = {
    options: SearchBarOptions[]
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & typeof defaultSearchBarProps

function SearchBar({ 
    options,
    onChange
}: SearchBarProps ): ReactElement {
    return (
        <Autocomplete
            id="text-field-search"
            freeSolo
            options={options}
            getOptionLabel={(option: SearchBarOptions) => option && option.title ? option.title : ''}
            renderInput={(params) => <TextField {...params} onChange={onChange} label="Search" variant="outlined" />}
        />
    )
}

SearchBar.defaultProps = defaultSearchBarProps;
export default SearchBar
