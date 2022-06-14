import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getData } from '../../Utils';
import FullPost from '../Post';
import Header from '../Header';
import { Box } from '@chakra-ui/react';
import LoadingScreen from '../mics/LoadingScreen';
import FeedMap from './components/FeedMap';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [{ currentSubreddit, currentSubType }, setCurrentSubreddit] = useState({ currentSubreddit: null, currentSubType: null });
  const [{ prevSubreddit, prevSubType }, setPrevSubreddit] = useState({ prevSubreddit: null, prevSubType: null });
  const [searchError, setSearchError] = useState('');
  const [{ currentSelectedPost, key }, setCurrentSelectedPost] = useState({ currentSelectedPost: null, key: null });
  const { getSubRedditFeed, SortType, SortTimeFrame } = getData();
  const [currentSearchType, setCurrentSearchType] = useState(SortType.top);
  const [currentSortTime, setCurrentSortTime] = useState(SortTimeFrame.day);
  const [isLoading, setIsLoading] = useState(true);
  const [showNSFW, setShowNSFW] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await (() => {
          return getSubRedditFeed(currentSubreddit, currentSearchType, currentSortTime, currentSubType);
        })();
        setPosts(post?.data);
        setSearchError('');
        setIsLoading(false);
      } catch (error) {
        setCurrentSubreddit({ currentSubreddit: prevSubreddit, currentSubTypeP: prevSubType });
        console.log('Could not fetch subreddit');
        setSearchError('no results found!');
        return null;
      }
    };
    fetch();
  }, [currentSubreddit, currentSearchType, showNSFW, currentSortTime]);

  const ChangeSubreddit = (subreddit, SearchType) => {
    setIsLoading(true);
    setPrevSubreddit({ prevSubreddit: currentSubreddit, prevSubType: currentSubType });
    setCurrentSubreddit({ currentSubreddit: subreddit, currentSubType: SearchType });
    setCurrentSelectedPost({ currentSelectedPost: null, key: null });
  };

  const changeCurrentSortType = (type) => {
    setIsLoading(true);
    setCurrentSearchType(type);
    setCurrentSelectedPost({ currentSelectedPost: null, key: null });
  };

  const changeCurrentSortTime = (time) => {
    setIsLoading(true);
    setCurrentSortTime(time);
    setCurrentSelectedPost({ currentSelectedPost: null, key: null });
  };

  const PostBody = ({ post, hideWindow }) => {
    return (
      <div>
        <FullPost post={post} hideWindow={(event) => hideWindow(event)} />
      </div>
    );
  };

  const setCurrentSelectedPostAndKey = (post) => {
    setCurrentSelectedPost({ currentSelectedPost: post, key: window.pageYOffset });
  };

  if (!currentSelectedPost) {
    //!posts || !posts.length ||
    if (isLoading) {
      return <LoadingScreen />;
    } else {
      return (
        <Box bg="primary" paddingTop="30px">
          <Container>
            <Header
              userSettings={{ showNSFW: showNSFW }}
              handleSearch={(value) => ChangeSubreddit(value.value, value.SearchType)}
            />
            <FeedMap
              posts={posts}
              searchError={searchError}
              currentSearchType={currentSearchType}
              changeCurrentSortType={(type) => changeCurrentSortType(type)}
              changeCurrentSortTime={(value) => changeCurrentSortTime(value)}
              currentSortTime={currentSortTime}
              showNSFW={showNSFW}
              setShowNSFW={(bool) => setShowNSFW(bool)}
              currentSubreddit={currentSubreddit}
              ChangeSubreddit={(value) => ChangeSubreddit(value)}
              setCurrentSelectedPostAndKey={(value) => setCurrentSelectedPostAndKey(value)}
            />
          </Container>
        </Box>
      );
    }
  } else if (currentSelectedPost) {
    return (
      <div>
        <PostBody
          post={currentSelectedPost}
          hideWindow={() => {
            setCurrentSelectedPost({ currentSelectedPost: null, key: key });
          }}
        />
        {key && window.scrollTo(0, 0)}
      </div>
    );
  }
};

export default Feed;
