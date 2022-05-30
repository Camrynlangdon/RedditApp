import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '@chakra-ui/react';
import UpVoteDownVote from '../../mics/UpVoteDownVote';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 98%;
`;

const CommentSection = styled.div`
  max-width: 100%;
  border: solid 1px black;
  border-radius: 5px;
  padding: 3px 0px 3px 1px;
  margin: 3px -1px 3px 6px;
`;

const CommentDiv = styled.div`
  max-width: 100%;
  padding-bottom: 5px;
`;

const ButtonHideComment = styled.button`
  font-size: 10px;
  height: 20px;
  width: 35px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border: solid 1px black;
  border-radius: 5px;

  :hover {
    background: ${({ disabled }) => (disabled ? '' : 'rgb(60, 60, 60)')};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding 0px 15px 15px 15px;
`;

const BottomBannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin-top: 6px;
  padding-right: 10px;
  border-top: 1px solid;
  border-color: rgba(40, 40, 40);
`;

const CommentThread = ({ comments, parentComment }) => {
  if (comments === undefined) return null;
  return (
    <div style={{ maxWidth: '100%' }}>
      {comments.map((comment, key) => {
        if (comment.kind === 'more') return null;

        if (parentComment?.backgroundColor !== undefined) {
          //each child comment gets slightly darker
          const backgroundColor = {
            red: parentComment.backgroundColor.red - 5,
            green: parentComment.backgroundColor.green - 5,
            blue: parentComment.backgroundColor.blue - 5,
          };

          comment = {
            ...comment,
            backgroundColor,
          };
        } else {
          const backgroundColor = {
            //starting color
            red: 43,
            green: 43,
            blue: 47,
          };

          comment = {
            ...comment,
            backgroundColor,
          };
        }

        return <Comment comment={comment} key={key} />;
      })}
    </div>
  );
};

const BottomBanner = ({ comment, showButton, showResults, setShowResults }) => {
  return (
    <BottomBannerContainer>
      <ButtonContainer>
        {showButton && (
          <ButtonHideComment onClick={() => setShowResults(!showResults)}>
            {!showResults ? <Text>Show</Text> : <Text>Hide</Text>}
          </ButtonHideComment>
        )}
      </ButtonContainer>
      <UpVoteDownVote post={comment.data} />
    </BottomBannerContainer>
  );
};
const Comment = ({ comment }) => {
  const [showResults, setShowResults] = useState(false);
  const [showButton, setShowButton] = useState(false);
  let childComments = comment.data.replies?.data?.children;

  if (
    childComments &&
    childComments !== undefined &&
    !showButton &&
    childComments.kind !== 'more' &&
    typeof childComments !== 'undefined'
  ) {
    if (childComments[0].kind !== 'more') setShowButton(true);
  }
  const r = comment.backgroundColor.red;
  const g = comment.backgroundColor.green;
  const b = comment.backgroundColor.blue;

  return (
    <CommentDiv>
      <CommentSection style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}>
        <Post>
          <Body>
            <Text variant="user" fontSize="12px">
              {comment.data.author}
            </Text>
            <Text fontSize="13px">{comment.data.body}</Text>
          </Body>
          <BottomBanner comment={comment} showButton={showButton} showResults={showResults} setShowResults={setShowResults} />
        </Post>
        {showResults && <CommentThread comments={childComments} parentComment={comment} />}
      </CommentSection>
    </CommentDiv>
  );
};

const Comments = ({ post }) => {
  const comments = post.comments;

  if (!comments || !comments.length) return '...loading';
  return (
    <MainContainer>
      <CommentThread comments={comments} />
    </MainContainer>
  );
};

export default Comments;
