import styled from 'styled-components';
import { Text, Box } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import ShortNumbers from '../../mics/ShortNumbers';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;

  width: 72px;
  height: 30px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 24px;
  cursor: pointer;
  /* background-color: black; */
`;

const VoteDiv = styled.div`
  width: 100%
  height: 28px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: space-evenly;
`;

const LowerButtons = ({ commentData }) => {
  const handleVote = () => {};
  return (
    <MainContainer>
      <VoteDiv>
        <Button onClick={() => console.log('upVote')}>
          <ArrowUpIcon w={6} h={6} margin="-3px" padding="-3px" color="primary" />
        </Button>

        <ShortNumbers number={commentData.score} />

        <Button onClick={() => console.log('downVote')}>
          <ArrowDownIcon w={6} h={6} margin="-3px" padding="-3px" color="primary" />
        </Button>
      </VoteDiv>
    </MainContainer>
  );
};

export default LowerButtons;
