import Styled from 'styled-components';
import SearchBar from '../mics/SearchBar';
import Dropdown from '../mics/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;
  background-color: rgb(255, 100, 0);
  border-radius: 100px;
`;

const Header = ({ handleSearch }) => {
  const options = [
    'pics',
    'stories',
    'aww',
    'News',
    'WorldNews',
    'California',
    'Bayarea',
    'Jokes',
    'Frontend',
    'ProgrammerHumor',
  ];
  return (
    <MainContainer>
      <Home href="../index">
        <FontAwesomeIcon icon={faRedditAlien} color="white" size="2x" position="fixed" />
      </Home>

      <div>
        <SearchBar onClick={(value) => handleSearch(value)} />
      </div>
      <Dropdown handleSearch={(value) => handleSearch(value)} options={options} icon={faBars} iconSize={'2x'} />
    </MainContainer>
  );
};

export default Header;
