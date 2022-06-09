import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getData } from '../../Utils';
import FullPost from '../Post';
import Header from '../Header';
import { Box, Text } from '@chakra-ui/react';
import BottomBanner from './components/BottomBanner';
import SortTypeDropdown from './components/SortTypeDropdown';
import LoadingScreen from '../mics/LoadingScreen';
import Media from '../mics/Media';
import NSFWToggleButton from '../mics/NSFWToggle';
import Awardings from '../mics/Awardings';
import Link from '../mics/Link';
import TimeStamp from '../mics/TimeStamp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;

  overflow-y: auto;
  background-color: rgb(35, 35, 35);
  border: 1px solid;
  border-color: rgb(80, 80, 80);

  margin-bottom: 15px;
  color: inherit;
  font: inherit;

  outline: inherit;
  @media only screen and (max-width: 614px) {
     {
      width: 100%;
    }
  }
  @media only screen and (min-width: 615px) {
     {
      max-width: 800px;
      border-radius: 4px;
    }
  }
`;

const Post = styled.div`
  width: 100%;
  padding-top: 8px;
`;

const PostData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-left: 15px;
  padding-right: 15px;
`;

const TopNav = styled.div`
  width: 100%;
  padding: 2px 10px 2px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0px 15px 0px;

  background-color: rgb(35, 35, 35);
  border: solid 1px rgb(80, 80, 80);
  border-radius: 4px;
`;

const FeedContainer = styled.div`
  padding-top: 8px;
`;

const SearchError = styled.p`
  color: red;
  margin-top: 3px;
  margin-left: 5px;
`;

const EmptyBox = styled.div`
  min-height: 100%;
  width: 100%;
  cursor: pointer;
`;
const SubredditButton = styled.button`
  text-shadow: 3px 3px 3px black;
  :hover {
    margin-left: -2px;
    font-weight: bold;
  }
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentSubreddit, setCurrentSubreddit] = useState();
  const [prevSubreddit, setPrevSubreddit] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [{ currentSelectedPost, key }, setCurrentSelectedPost] = useState({ currentSelectedPost: null, key: null });
  const [SavedFeed, setSavedFeed] = useState(null);
  const { getSubRedditFeed, SortType, SortTimeFrame } = getData();
  const [currentSearchType, setCurrentSearchType] = useState(SortType.top);
  const [currentSortTime, setCurrentSortTime] = useState(SortTimeFrame.day);
  const [isLoading, setIsLoading] = useState(true);
  const [showNSFW, setShowNSFW] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await (() => {
          return getSubRedditFeed(currentSubreddit, currentSearchType, currentSortTime);
        })();
        setPosts(post.data);
        setSavedFeed(() => {
          return null;
        });
        setSearchError('');
        setIsLoading(false);
      } catch (error) {
        setCurrentSubreddit(prevSubreddit);
        console.log('Could not fetch subreddit');
        setSearchError('no results found!');
        return null;
      }
    };
    fetch();
  }, [currentSubreddit, currentSearchType, showNSFW, currentSortTime]);

  const ChangeSubreddit = (subreddit) => {
    setIsLoading(true);
    setPrevSubreddit(currentSubreddit);
    setCurrentSubreddit(subreddit);
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

  const MainFeed = ({ post }) => {
    return (
      <Post>
        <PostData>
          <Box display="inline-flex" alignItems="start" flexDirection="column" w="100%">
            {!currentSubreddit && (
              <SubredditButton onClick={() => ChangeSubreddit(post.subreddit)}>
                <Text wordBreak="none" fontSize="13px">
                  r/{post.subreddit}
                </Text>
              </SubredditButton>
            )}
            <Box display="flex" flexDirection="row">
              <Text variant="user">u/{post?.author}</Text>
              <Text paddingLeft="5px" paddingRight="5px" variant="user">
                •
              </Text>
              <TimeStamp msTime={post.created_utc} />
            </Box>
          </Box>

          <EmptyBox onClick={() => setCurrentSelectedPostAndKey(post)}></EmptyBox>
        </PostData>

        <Awardings awards={post.all_awardings} />
        <EmptyBox onClick={() => setCurrentSelectedPostAndKey(post)}>
          <Text w="100%" padding="0px 15px 5px 15px" onClick={() => setCurrentSelectedPostAndKey(post)}>
            {post.title}
          </Text>

          <Media post={post} onClick={() => setCurrentSelectedPostAndKey(post)} />
        </EmptyBox>
        <Box marginLeft="20px" marginTop="-7px" marginBottom="7px">
          {post.image && <Link href={post.image} text={post.image} />}
        </Box>
      </Post>
    );
  };

  const FeedMap = () => {
    return (
      <FeedContainer>
        <SearchError>{searchError}</SearchError>
        <TopNav>
          <SortTypeDropdown
            currentSearchType={currentSearchType}
            setCurrentSortType={(type) => changeCurrentSortType(type)}
            currentSortType={currentSearchType}
            setCurrentSortTime={(value) => changeCurrentSortTime(value)}
            currentSortTime={currentSortTime}
          />

          <NSFWToggleButton setShowNSFW={(bool) => setShowNSFW(bool)} isChecked={showNSFW} />
        </TopNav>

        {posts.map((post, key) => {
          if (post.over_18 && !showNSFW) return null;
          return (
            <PostContainer key={key}>
              <div>
                <MainFeed post={post} />
              </div>
              <BottomBanner post={post} setCurrentSelectedPostAndKey={(value) => setCurrentSelectedPostAndKey(value)} />
            </PostContainer>
          );
        })}
      </FeedContainer>
    );
  };

  if (!currentSelectedPost) {
    if (!posts || !posts.length || isLoading) {
      return <LoadingScreen />;
    } else {
      return (
        <Box bg="primary" paddingTop="30px">
          <Container>
            <Header userSettings={{ showNSFW: showNSFW }} handleSearch={(value) => ChangeSubreddit(value)} />

            {(() => {
              if (SavedFeed) {
                return (
                  <div>
                    <SavedFeed />
                    {key && window.scrollTo(0, key)}
                  </div>
                );
              } else {
                setSavedFeed(() => {
                  return FeedMap;
                });
              }
            })()}
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
