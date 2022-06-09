import styled from 'styled-components';
import Comments from './components/Comments';
import { Text, Box } from '@chakra-ui/react';
import BottomBanner from '../Feed/components/BottomBanner';
import Media from '../mics/Media';
import Awardings from '../mics/Awardings';
import Markdown from '../mics/markdown';
import Link from '../mics/Link';
import TimeStamp from '../mics/TimeStamp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
`;
const PostContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-items: center;
  padding-top: 25px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 20px;
  width: 100%;

  overflow-y: auto;

  /* a {
    color: white;
  } */
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 800px;
`;

const ExitButton = styled.button`
  font-weight: bold;
  color: inherit;
  cursor: pointer;
  background-color: inherit;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 35px;
  width: 70px;
  margin-right: 15px;

  :hover {
    background-color: red;
  }
`;

const PostBanner = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 40px;
  justify-content: end;
  display: flex;
  align-items: center;
  background-color: black;
`;

const RedditBrowser = ({ post, hideWindow }) => {
  if (!post) return '...loading';
  return (
    <Box bg="primary" w="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingTop="85">
      <PostBanner>
        <ExitButton onClick={(event) => hideWindow(event)}>
          <Text>X Close</Text>
        </ExitButton>
      </PostBanner>

      <Box
        bg="secondary"
        maxWidth="700px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="4px"
        padding="1px"
      >
        <Container>
          <PostContainer>
            <Awardings awards={post.all_awardings} style={{ fontWeight: 'bold' }} />
            <Box display="flex" flexDirection="row">
              <Text variant="user">u/{post?.author}</Text>
              <Text paddingLeft="5px" paddingRight="5px" variant="user">
                •
              </Text>
              <TimeStamp msTime={post.created_utc} />
            </Box>

            <Markdown text={post.title} fontSize="17px" padding="0px 15px 5px 15px" />
            {post.image && <Link href={post.image} text={post.image} />}
            {post.selftext && <Markdown text={post.selftext} fontSize="12px" style={{ paddingTop: '10px' }} />}
          </PostContainer>
          <Media post={post} />
          <BottomBanner post={post} />
        </Container>

        <CommentContainer>
          <Comments post={post} />
        </CommentContainer>
      </Box>
    </Box>
  );
};

export default RedditBrowser;
