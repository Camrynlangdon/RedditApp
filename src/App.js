import './App.css';
import Styled from 'styled-components';

import Feed from './components/Feed';

function App() {
  const MainDiv = Styled.div`
    margin: 0px -8px 100px -8px;
    min-height: 950px;
  `;

  const Container = Styled.div`
    
  `;

  return (
    <MainDiv>
      <Container>
        <Feed />
      </Container>
    </MainDiv>
  );
}

export default App;
