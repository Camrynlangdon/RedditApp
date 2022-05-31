import { Box } from '@chakra-ui/react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons';

const LoadingLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 120px;
  width: 120px;
  background-color: rgb(255, 100, 0);

  border-radius: 100px;
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

const LoadingScreenExport = () => {
  return (
    <Box bg="primary" height="100vh">
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
};

export default LoadingScreenExport;