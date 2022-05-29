import './App.css';
import Styled from 'styled-components';

import Feed from './components/Feed';

function App() {
  const MainDiv = Styled.div`
    
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  `;

  return (
    <MainDiv>
      <Feed />
    </MainDiv>
  );
}

export default App;
