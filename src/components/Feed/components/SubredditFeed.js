import Awardings from '../../mics/Awardings';
import Link from '../../mics/Link';
import TimeStamp from '../../mics/TimeStamp';
import Media from '../../mics/Media';
import { Box, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { getData } from '../../../Utils';

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

const UserButton = styled.button`
  text-shadow: 2px 2px 3px black;
  :hover {
    margin-left: -2px;
    font-weight: bold;
  }
`;

const SubredditFeed = ({ post, currentSubreddit, ChangeSubreddit, setCurrentSelectedPostAndKey }) => {
  const { searchType } = getData();
  return (
    <Post>
      <PostData>
        <Box display="inline-flex" alignItems="start" flexDirection="column" w="100%">
          {!currentSubreddit && (
            <SubredditButton onClick={() => ChangeSubreddit({ subreddit: post.subreddit, searchType: null })}>
              <Text wordBreak="none" fontSize="13px">
                r/{post.subreddit}
              </Text>
            </SubredditButton>
          )}
          <Box display="flex" flexDirection="row">
            <UserButton>
              <Text variant="user" onClick={() => ChangeSubreddit({ author: post?.author, searchType: searchType.user })}>
                u/{post?.author}
              </Text>
            </UserButton>
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
        <Text
          w="100%"
          padding="0px 15px 5px 15px"
          textShadow="3px 3px 4px black"
          onClick={() => setCurrentSelectedPostAndKey(post)}
        >
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

export default SubredditFeed;
