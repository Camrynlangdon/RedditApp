import { useState } from 'react';
import ShortNumbers from './ShortNumbers';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import styled from 'styled-components';

const VoteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 33px;
  cursor: pointer;
`;

const VoteDiv = styled.div`
  width: 100%
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: space-evenly;
`;

const UpVoteDownVote = ({ post }) => {
  const [upVoted, setUpVoted] = useState(null);

  const NumOfVotes = () => {
    //temp until user can log in
    if (upVoted === true) return post.score + 1;
    else if (upVoted === false) return post.score - 1;
    else if (upVoted === null) return post.score;
  };

  const handleVoteColor = (buttonType) => {
    if (upVoted == null) return 'primary';
    if (upVoted === true) {
      if (buttonType === 'upVote') return 'red';
      else return 'primary';
    } else if (upVoted === false) {
      if (buttonType === 'downVote') return 'red';
      else return 'primary';
    }
  };

  const handleVote = (buttonType) => {
    const vote = (boolean) => {
      if (upVoted === boolean) setUpVoted(null);
      else setUpVoted(boolean);
    };

    if (buttonType === 'upVote') {
      vote(true);
    } else if (buttonType === 'downVote') {
      vote(false);
    }
  };
  return (
    <VoteDiv>
      <VoteButton onClick={() => handleVote('upVote')}>
        <ArrowUpIcon w={6} h={6} margin="-3px" padding="-3px" color={handleVoteColor('upVote')} />
      </VoteButton>

      <ShortNumbers number={NumOfVotes()} />

      <VoteButton onClick={() => handleVote('downVote')}>
        <ArrowDownIcon w={6} h={6} margin="-3px" padding="-3px" color={handleVoteColor('downVote')} />
      </VoteButton>
    </VoteDiv>
  );
};

export default UpVoteDownVote;
