import './App.css';
import Styled from 'styled-components';
import { Box } from '@chakra-ui/react';
import Feed from './components/Feed';

function App() {
  const MainDiv = Styled.div`
    height: 100vh;
    width: 100vw;
  `;

  return (
    <Box bg="primary">
      <MainDiv>
        <Feed />
      </MainDiv>
    </Box>
  );
}

export default App;
