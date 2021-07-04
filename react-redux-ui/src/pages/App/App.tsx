import { ChangeEvent, ReactElement, useEffect } from 'react';
import './App.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { searchBarActions } from '../../actions/searchBarActions';
import { ApplicationState } from '../../interfaces/interface';

function App() {

  const dispatch = useDispatch();
  let options = useSelector((state: ApplicationState) => state.searchBarReducer.options)
  let fullName = useSelector((state: ApplicationState) => state.contentReducer.fullName)
  let biography = useSelector((state: ApplicationState) => state.contentReducer.biography)
  let followerCount = useSelector((state: ApplicationState) => state.contentReducer.followerCount)
  let posts = useSelector((state: ApplicationState) => state.contentReducer.posts)
  let latestPost = posts[0]

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

  function Content({ content }: { content: string | number }): ReactElement {
    return (<div className='content'> {content} </div>)
  }

  function LatestPostContent ({ content }: { content: string | number | undefined}): ReactElement {
    return (<div className=''> {content} </div>)
  }

  return (
    <div className='App'>
      <SearchBar onChange={onChange} options={options} />

      <Heading title='Name' />
      <Content content={fullName} />

      <Heading title='Biography' />
      <Content content={biography} />

      <Heading title='Follower Count' />
      <Content content={followerCount} />

      <Heading title='Latest Post' />
      <LatestPostContent content={latestPost.commentCount} />
      <LatestPostContent content={latestPost.likeCount} />
      <LatestPostContent content={latestPost.mediaURL} />
      <LatestPostContent content={latestPost.postType} />

    </div>
  );
}

export default App;
