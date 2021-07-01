import { ChangeEvent, ReactElement, useEffect } from 'react';
import './App.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { searchBarActions } from '../../actions/searchBarActions';
import { ApplicationState } from '../../interfaces/interface';

function App() {
  const dispatch = useDispatch();
  const options = useSelector((state: ApplicationState) => state.searchBarReducer.options)

  useEffect(() => {
    // dispatch(searchBarActions.setDropdownOptions([]))
  })

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(searchBarActions.setSearchInput(e.target.value))
    dispatch(searchBarActions.searchThunk())
  }

  function Heading({ title }: { title: string }): ReactElement {
    return (<div>{title}</div>);
  }

  return (
    <div className='App'>
      <SearchBar onChange={onChange} options={options} />
      <Heading title='Name' />
      <Heading title='Biography' />
      <Heading title='Follower Count' />
      <Heading title='Latest Post' />
    </div>
  );
}

export default App;
