import styled from 'styled-components';
import Comments from './components/Comments';
import { Text, Box } from '@chakra-ui/react';
import BottomBanner from '../Feed/components/BottomBanner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding-top: 25px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 20px;

   {
    /*min-height: 400px;*/
  }

  overflow-y: auto;

  a {
    color: white;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 3px;
  border-color: white;
  border: solid;
  border-width: 1px;

  @media only screen and (max-width: 614px) {
     {
      width: 100%;
    }
  }
  @media only screen and (min-width: 615px) {
     {
      max-height: 1000px;
      max-width: 95%;
    }
  }
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
        <ExitButton onClick={(event) => hideWindow(event)}>X Close</ExitButton>
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
            <Text variant="user">{post?.author}</Text>
            <Text>{post.title}</Text>
            <Text fontSize="12px" paddingTop="15px">
              {post.selftext}
            </Text>
          </PostContainer>
          <ImageContainer>{post?.image?.slice(-3) === 'jpg' && <Image src={post.image} alt={post.title} />}</ImageContainer>
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
