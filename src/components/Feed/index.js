import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getData } from '../../Utils';
import FullPost from '../Post';
import Header from '../Header';
import { Box, Text } from '@chakra-ui/react';
import BottomBanner from './components/BottomBanner';
import SearchType from './components/SearchType';
import LoadingScreen from '../mics/LoadingScreen';

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
  cursor: pointer;
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
  a {
    color: white;
  }
`;

const Post = styled.div`
  max-width: 100%;
  padding-top: 8px;
`;

const PostData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`;

const TopNav = styled.div`
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

const FeedContainer = styled.div`
  padding-top: 8px;
`;

const SearchError = styled.p`
  color: red;
  margin-top: 3px;
  margin-left: 5px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 2px;

  @media only screen and (max-width: 614px) {
     {
      width: 100%;
    }
  }
  @media only screen and (min-width: 615px) {
     {
      max-height: 900px;
      max-width: 95%;
    }
  }
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentSubreddit, setCurrentSubreddit] = useState('pics');
  const [searchError, setSearchError] = useState('');
  const [{ currentSelectedPost, key }, setCurrentSelectedPost] = useState({ currentSelectedPost: null, key: null });
  const [SavedFeed, setSavedFeed] = useState(null);
  const { getSubRedditFeed, searchTypes } = getData();
  const [currentSearchType, setCurrentSearchType] = useState(searchTypes.hot);

  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await (() => {
          return getSubRedditFeed(currentSubreddit, currentSearchType);
        })();
        setPosts(post.data);
        setSavedFeed(() => {
          return null;
        });
        setSearchError('');
      } catch (error) {
        console.log('Could not fetch subreddit');
        setSearchError('no results found!');
        return null;
      }
    };
    fetch();
  }, [currentSubreddit, currentSearchType]);

  const PostBody = ({ post, hideWindow }) => {
    return (
      <div>
        <FullPost post={post} hideWindow={(event) => hideWindow(event)} />
      </div>
    );
  };

  const MainFeed = ({ post }) => {
    return (
      <Post>
        <PostData>
          <Text variant="user">Post made by u/{post?.author}</Text>
          <Text>{post.title}</Text>
        </PostData>
        <ImageContainer>{post.image.slice(-3) === 'jpg' && <Image src={post.image} alt={post.title} />}</ImageContainer>
      </Post>
    );
  };

  const FeedMap = () => {
    return (
      <FeedContainer>
        {posts.map((post, key) => {
          return (
            <PostContainer key={key}>
              <div onClick={() => setCurrentSelectedPost({ currentSelectedPost: post, key: window.pageYOffset })}>
                <MainFeed post={post} />
              </div>
              <BottomBanner post={post} />
            </PostContainer>
          );
        })}
      </FeedContainer>
    );
  };

  if (!currentSelectedPost) {
    if (!posts || !posts.length) return <LoadingScreen />;
    return (
      <Box bg="primary" paddingTop="30px">
        <Container>
          <Header handleSearch={(value) => setCurrentSubreddit(value)} />
          <TopNav>
            <SearchError>{searchError}</SearchError>
          </TopNav>
          <SearchType currentSearchType={currentSearchType} setCurrentSearchType={(type) => setCurrentSearchType(type)} />
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
              //console.log({ currentSelectedPost, key }, { CurrentFeed });
            }
          })()}
        </Container>
      </Box>
    );
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
