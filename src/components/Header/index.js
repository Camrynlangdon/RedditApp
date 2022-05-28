import Styled from 'styled-components';
import SearchBar from '../SearchBar';
import Dropdown from '../Dropdown';
//import { FaRedditAlien } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainContainer = Styled.div`
display: flex;
position: fixed;
top: 10px;
justify-content: space-between;
align-items: center;

margin-top: -10px;

height: 50px;
width: 100%;

background-color: rgb(30, 30, 30);
border: 1px solid;
border-color: rgb(80, 80, 80);
`;

const Home = Styled.a`
margin-left: 15px;
margin-right: 20px;
text-decoration: none;
color: white;
font-size: 18px;

background-color: rgb(255, 100, 0);
padding: 3px 9px 1px 9px;
border-radius: 200px;
`;

const Header = ({ handleSearch }) => {
  return (
    <MainContainer>
      <Home href="../index">
        <FontAwesomeIcon
          icon={['fas', 'reddit']}
          color="white"
          size="24px"
          position="fixed"
          style={{ margin: ' 1px -3px 1px -3px' }}
        />
      </Home>

      <div>
        <SearchBar onClick={(value) => handleSearch(value)} />
      </div>
      <Dropdown handleSearch={(value) => handleSearch(value)} />
    </MainContainer>
  );
};

export default Header;
