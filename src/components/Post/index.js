import styled from 'styled-components';
import Comments from './Comments';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 32px;
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding-top: 25px;

   {
    /*min-height: 400px;*/
  }
  max-height: 50%;
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
  border-radius: 15px;
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

const MainContainer = styled.div``;

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
    <MainContainer>
      <PostBanner>
        <ExitButton onClick={(event) => hideWindow(event)}>X Close</ExitButton>
      </PostBanner>

      <Container>
        <PostContainer>
          <span>{post?.author}</span>
          <a href={post?.url}>Link to reddit</a>
          <h1>{post.title}</h1>
          <ImageContainer>{post?.image?.slice(-3) === 'jpg' && <Image src={post.image} alt={post.title} />}</ImageContainer>
          <p>{post.text}</p>
        </PostContainer>
      </Container>

      <CommentContainer>
        <Comments post={post} />
      </CommentContainer>
    </MainContainer>
  );
};

export default RedditBrowser;
