import { React, useState, useEffect } from 'react';
import Styled from 'styled-components';
import { getData } from '../../Utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import { Box, Text } from '@chakra-ui/react';

const MainContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
`;

const SearchField = Styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: none;
  color: white;

  width: 100%;
  height: 80%;
  padding-left: 30px;
  padding-right: 15px;
  margin-left: -22px;
  margin-bottom: 2px;
  border: none;

  :focus {
    outline: none;
}   
`;

const Button = Styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;

  background-color: inherit;
  padding: 5px 15px 5px 15px;

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
  justify-content: center;

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
  top: 38px;
 
  z-index: -1;
  width: 200px;
 
  background-color: rgb(30, 30, 30);
  border-color: rgb(80, 80, 80);
  border-radius: 0px 0px 3px 3px;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
`;

const SearchBar = ({ handleSearch, userSettings }) => {
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(true);

  const [searchResults, setSearchResults] = useState(null);
  const [userSearchResults, setUserSearchResults] = useState(null);
  const { search, searchType } = getData();

  const SearchSubreddits = async (value) => {
    const fetch = async () => {
      try {
        return await search(value, searchType.subredditName, userSettings.showNSFW);
      } catch (error) {
        console.log('Could not fetch search results', error);
        return null;
      }
    };
    const results = await fetch();
    setSearchResults(results);
  };

  const SearchUsers = async (value) => {
    const fetch = async () => {
      try {
        return await search(value, searchType.user);
      } catch (error) {
        console.log('Could not fetch search results', error);
        return null;
      }
    };
    const results = await fetch();
    setUserSearchResults(results);
  };

  useEffect(() => {
    SearchSubreddits(searchValue);
    SearchUsers(searchValue);
  }, [userSettings.showNSFW]);

  const searchOnChange = (value) => {
    setSearchValue(value);
    SearchSubreddits(value);
    SearchUsers(value);
  };

  const select = (value, SearchType) => {
    if (value !== null && value !== undefined) {
      handleSearch({ value, SearchType });
    }
    setExpanded(false);
  };

  const DropdownItems = ({ value, SearchType }) => {
    return (
      <Button value={value} onClick={() => select(value, SearchType)}>
        <Box>
          <Text paddingLeft="20px">
            {(() => {
              if (SearchType === searchType.user) {
                return 'u/';
              } else {
                return 'r/';
              }
            })()}
            {value}
          </Text>
        </Box>
      </Button>
    );
  };

  return (
    <MainContainer>
      <SearchBarContainer>
        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center" paddingRight="10px">
          <Box w="100%" display="flex" justifyContent="start" alignItems="center">
            <FontAwesomeIcon
              icon={faSearch}
              color="white"
              size="1x"
              position="absolute"
              style={{ margin: ' 1px 1px 1px 15px' }}
            />
            <SearchField
              placeholder="Search"
              type="text"
              value={searchValue}
              onFocus={() => setExpanded(true)}
              onChange={(event) => searchOnChange(event.target.value)}
            ></SearchField>
          </Box>
          {searchValue !== '' && (
            <button onClick={() => setSearchValue('')}>
              <FontAwesomeIcon
                icon={faClose}
                color="white"
                size="1x"
                position="absolute"
                alignitems="center"
                justifycontent="center"
                style={{ margin: ' 1px 1px 1px 1px' }}
              />
            </button>
          )}
        </Box>

        {(() => {
          if (searchValue && expanded) {
            return (
              <SearchBaDropdown onBlur={() => setExpanded(false)}>
                <Button value={searchValue} onClick={(event) => handleSearch(searchValue, null)}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    color="white"
                    size="1x"
                    position="absolute"
                    style={{ margin: ' 1px 8px 1px 0px' }}
                  />
                  <Text>Search for "{searchValue}"</Text>
                </Button>

                {(() => {
                  const subredditResults = searchResults?.names;
                  if (subredditResults)
                    return (
                      <div>
                        {subredditResults.map((option, index) => {
                          return <DropdownItems key={index} value={option} SearchType={searchType.subredditName} />;
                        })}
                      </div>
                    );
                })()}
                {(() => {
                  const results = userSearchResults?.data?.children;
                  if (results === undefined) return null;
                  if (Object.keys(results).length > 1)
                    return (
                      <div>
                        {results.map((option, index) => {
                          if (index >= 5) return null;
                          return <DropdownItems key={index} value={option.data.name} SearchType={searchType.user} />;
                        })}
                      </div>
                    );
                })()}
              </SearchBaDropdown>
            );
          }
        })()}
      </SearchBarContainer>
    </MainContainer>
  );
};

export default SearchBar;
