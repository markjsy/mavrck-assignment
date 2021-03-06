import { ChangeEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import './App.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { searchBarActions } from '../../actions/searchBarActions';
import { ApplicationState } from '../../interfaces/interface';
import { useSubscription } from '@apollo/client';
import { GET_USER_SUBSCRIPTION } from '../../constants/requests/searchBarRequestsConstants';
import { Button } from '@material-ui/core';
import { contentActions } from '../../actions';

function App() {
    const dispatch = useDispatch();
    let options = useSelector((state: ApplicationState) => state.searchBarReducer.options);
    let { data, error, loading } = useSubscription(GET_USER_SUBSCRIPTION, { shouldResubscribe: true });

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        dispatch(searchBarActions.setSearchInput(e.target.value));
    }

    function onClick(e: MouseEvent<HTMLElement>) {
        dispatch(searchBarActions.searchThunk());
    }

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>){
        if (e.code == 'Enter') {
            dispatch(searchBarActions.searchThunk());
            e.preventDefault();
        }
    }

    function FullName(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.fullName;
            const payload = { fullName: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Name: </b>
                    {field}
                </div>
            );
        } else {
            return <div>No full name found</div>;
        }
    }

    function Biography(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.biography;
            const payload = { biography: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Biography:</b> {field}
                </div>
            );
        } else {
            return <div>No biography found</div>;
        }
    }

    function FollowerCount(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.followerCount;
            const payload = { followerCount: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Follower Count: </b>
                    {field}
                </div>
            );
        } else {
            return <div>No follower count found</div>;
        }
    }

    function RetrievedAt(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.retrievedAt;
            const payload = { retrievedAt: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Last time data was retrieved: </b>
                    {new Date(field).toUTCString()}
                </div>
            );
        } else {
            return <div>No retrieved at date found</div>;
        }
    }

    function PostCommentCount(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.posts[0].commentCount;
            const payload = { commentCount: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Most Recent Post Comment Count: </b>
                    {field}
                </div>
            );
        } else {
            return <div>No post comment count found</div>;
        }
    }

    function PostLikeCount(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.posts[0].likeCount;
            const payload = { likeCount: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Most Recent Post Like Count: </b>
                    {field}
                </div>
            );
        } else {
            return <div>No post like count found</div>;
        }
    }

    function PostType(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.posts[0].postType;
            const payload = { postType: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div className="content">
                    <b>Most Recent Post Type: </b>
                    {field}
                </div>
            );
        } else {
            return <div>No post type found</div>;
        }
    }

    function PostMediaURL(): ReactElement {
        if (loading === false) {
            const field = data.normalSubscription.posts[0].mediaURL;
            const payload = { mediaURL: field };
            dispatch(contentActions.setContent(payload));
            return (
                <div>
                    <div className="content">
                        <b>Most Recent Post URL: </b>
                    </div>
                    <a href={field}>{field}</a>
                </div>
            );
        } else {
            return <div>No post media url found</div>;
        }
    }
    return (
        <div className="App">
            <Button onClick={onClick} color="primary" variant="contained">
                Search/Refresh
            </Button>

            <div className="space-between"></div>
            <SearchBar onKeyDown={onKeyDown} onChange={onChange} options={options} />
            <div className="space-between"></div>
            <FullName />
            <Biography />
            <FollowerCount />
            <RetrievedAt />
            <PostCommentCount />
            <PostLikeCount />
            <PostType />
            <PostMediaURL />
        </div>
    );
}

export default App;
