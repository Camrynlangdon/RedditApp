import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getData } from '../../Utils';
import FullPost from '../Post';
import Header from '../Header';
import { Box, FormLabel, Input, Text, Button } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons';

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
  align-items: center;
  max-height: 50%;
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
      width: 800px;
      border-radius: 4px;
    }
  }
  a {
    color: white;
  }
`;

const Post = styled.div`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 20px;
`;

const PostData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 15px;
`;

const TopNav = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

const FeedContainer = styled.div`
  padding-top: 50px;
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

const Author = styled.p`
  color: grey;
  font-size: 14px;
  word-break: break-word;
  margin-bottom: -7px;
`;

const LoadingLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 120px;
  width: 120px;
  background-color: rgb(255, 100, 0);

  border-radius: 100px;

  /* animation: rotation 2s infinite infinite; */
`;

const LoadingScreen = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  padding-top: 5px;
  font-size: 25px;

  animation: spin 2s infinite infinite;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 5px;
  font-size: 1.2rem;
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentSubreddit, setCurrentSubreddit] = useState('pics');
  const [searchError, setSearchError] = useState('');
  const [{ currentSelectedPost, key }, setCurrentSelectedPost] = useState({ currentSelectedPost: null, key: null });
  const [SavedFeed, setSavedFeed] = useState(null);
  const { getFeed } = getData();

  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await (() => {
          return getFeed(currentSubreddit);
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
  }, [currentSubreddit]);

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
          <Author>Post made by u/{post?.author}</Author>
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
            <PostContainer
              onClick={() => setCurrentSelectedPost({ currentSelectedPost: post, key: window.pageYOffset })}
              key={key}
            >
              <MainFeed post={post} />
            </PostContainer>
          );
        })}
      </FeedContainer>
    );
  };

  if (!currentSelectedPost) {
    if (!posts || !posts.length)
      return (
        <Box bg="bg.primary" height="100vh">
          <LoadingScreen>
            <Rotate>
              <LoadingLogo href="../index">
                <FontAwesomeIcon
                  icon={faRedditAlien}
                  color="white"
                  size="5x"
                  position="fixed"
                  style={{ margin: ' 5px 0px 5px 0px', animation: 'rotation 2s infinite linear' }}
                />
              </LoadingLogo>
            </Rotate>
            <LoadingText>...loading</LoadingText>
          </LoadingScreen>
        </Box>
      );
    return (
      <Box bg="bg.primary" paddingTop="30px">
        <Container>
          <Header handleSearch={(value) => setCurrentSubreddit(value)} />
          <TopNav>
            <SearchError>{searchError}</SearchError>
          </TopNav>

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
