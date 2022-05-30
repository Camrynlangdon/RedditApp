import { React, useState } from 'react';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MainContainer = Styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const SearchField = Styled.input`
  background: none;
  color: white;

  width: 70%;
  height: 80%;
  
  padding-left: 30px;
  padding-right: 15px;
  margin-left: -22px;
  margin-top: 3px;
  margin-bottom: 3px;
  
  border: none;

  :focus {
    outline: none;
}
    
`;

const Button = Styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;

  background-color: inherit;
  padding: 14px 15px 14px 15px;

  cursor: pointer;

  font-size: 12px;
  font-weight: 400;
  color: white;

  border: none;
  border-top: solid 1px;
  border-color: rgb(80, 80, 80);

  :hover {
    background-color: rgb(70, 70, 70);
  }
`;

const SearchBarContainer = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 200px;
  height: 100%;
  background-color: rgb(45, 45, 45);
  border-radius: 5px;
  border: 1px solid;
  border-color: rgb(80, 80, 80);
  :hover {
    background-color: inherit;
  }
`;

const SearchBaDropdown = Styled.div`
  position: absolute;
  margin-top: 90px;

  width: 200px;
 
  background-color: rgb(30, 30, 30);
  border-radius: 0px 0px 3px 3px;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: rgb(80, 80, 80);
`;

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(true);
  const onClick = props.onClick;

  const expand = () => {
    setExpanded(true);
  };

  const close = () => {
    setExpanded(false);
  };

  const select = (value) => {
    if (value !== null) {
      onClick(value);
    }

    close();
  };

  const upDateSearchValue = (value) => {
    setSearchValue(value);
    expand();
  };

  return (
    <MainContainer>
      <SearchBarContainer>
        <FontAwesomeIcon icon={faSearch} color="white" size="1x" position="absolute" style={{ margin: ' 1px 1px 1px 10px' }} />
        <SearchField
          placeholder="Search"
          type="text"
          onFocus={expand}
          onChange={(event) => setSearchValue(event.target.value)}
        ></SearchField>
        {(() => {
          if (searchValue !== '' && expanded) {
            return (
              <SearchBaDropdown onBlur={close}>
                <div style={{ marginTop: '15px' }}>
                  <Button value={searchValue} onClick={(event) => select(event.target.value)}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      color="white"
                      size="1x"
                      position="absolute"
                      style={{ margin: ' 1px 8px 1px 0px' }}
                    />
                    Search for "{searchValue}"
                  </Button>
                </div>
              </SearchBaDropdown>
            );
          }
        })()}
      </SearchBarContainer>
    </MainContainer>
  );
};

export default SearchBar;
