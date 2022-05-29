import styled from 'styled-components';
import { Text } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import Dropdown from '../../Dropdown';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;

  width: 100%;
  height: 30px;

  border-top: 1px solid rgb(40, 40, 40);
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
const ShareDiv = styled.div`
  background-color: none;
`;

const ShareButton = styled.a``;

const LowerButtons = ({ post }) => {
  const dropdownOptions = [post.url];
  return (
    <MainContainer>
      <ShareDiv>
        <Dropdown
          options={dropdownOptions}
          handleSearch={() => console.log('Share needs to be built')}
          icon={faDiagramProject}
          iconSize={'1x'}
        />
      </ShareDiv>

      <VoteDiv>
        <Button onClick={() => console.log('upVote')}>
          <ArrowUpIcon w={6} h={6} margin="-3px" padding="-3px" color="primary" />
        </Button>

        <Text display="flex" justifyContent="center" alignItems="center" fontSize="11px" padding=" 0 1px 0 1px">
          {post.score}
        </Text>

        <Button onClick={() => console.log('downVote')}>
          <ArrowDownIcon w={6} h={6} margin="-3px" padding="-3px" color="primary" />
        </Button>
      </VoteDiv>
    </MainContainer>
  );
};

export default LowerButtons;
