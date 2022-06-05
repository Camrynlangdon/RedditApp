import { useState } from 'react';
import styled from 'styled-components';
import UpVoteDownVote from '../../mics/UpVoteDownVote';
import { Text, Box } from '@chakra-ui/react';
import { faDiagramProject, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShortNumbers from '../../mics/ShortNumbers';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 30px;
  border-top: 1px solid rgb(40, 40, 40);
  padding-right: 12px;
  padding-left: 12px;

  padding-top: 15px;
  padding-bottom: 15px;
`;

const ShareDiv = styled.div`
  background-color: none;
  padding-right: 7px;
`;

const ShareButton = styled.button`
  display: flex;
  flex-direction: row;
  padding-right: 7px;

  align-items: center;
  justify-content: center;
`;

const LowerButtons = ({ post, setCurrentSelectedPostAndKey }) => {
  const [copied, setCopied] = useState(false);

  const handleShareButton = () => {
    navigator.clipboard.writeText(post.url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <MainContainer>
      <Box w="135px">
        {(() => {
          if (copied) {
            return (
              <Text paddingRight="7px" fontSize="14px" wordBreak="none">
                Copied to clipboard!
              </Text>
            );
          } else {
            return (
              <ShareDiv>
                <ShareButton onClick={handleShareButton}>
                  <FontAwesomeIcon icon={faDiagramProject} size={'1x'} color={'white'}></FontAwesomeIcon>
                  <Text fontSize="13px" paddingLeft="5px">
                    Share
                  </Text>
                </ShareButton>
              </ShareDiv>
            );
          }
        })()}
      </Box>

      <Box
        display="flex"
        flex-direction="row"
        justifyContent="space-between"
        alignItems="center"
        w="45px"
        onClick={() => setCurrentSelectedPostAndKey(post)}
      >
        <Box paddingRight="10px">
          <FontAwesomeIcon icon={faComments} color={'white'} />
        </Box>
        <ShortNumbers number={post.num_comments} fontSize={'14px'} />
      </Box>
      <Box w="150px" display="flex" justifyContent="end">
        <UpVoteDownVote post={post} />
      </Box>
    </MainContainer>
  );
};

export default LowerButtons;
