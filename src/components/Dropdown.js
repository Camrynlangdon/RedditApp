import React, { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Divider, Text, Button, Box } from '@chakra-ui/react';

const MainContainer = styled.div`
  display: flex;
  background-color: inherit;
  padding-right: 15px;
  padding-left: 15px;
`;

const DropdownContainer = styled.div`
  position: fixed;
  top: 51px;
  right: 0px;
  display: flex;
  flex-direction: column;

  border: 1px solid;
  border-radius: 3px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  width: auto;
  height: auto;
  cursor: pointer;

  :hover {
    background-color: rgb(35, 35, 35);
    border: solid 2px;
    border-radius: 5px;
    border-color: rgb(50, 50, 50);
    margin: -2px;
  }
`;

const SubRedditOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: left;

  background-color: rgb(80, 80, 80);
  padding: 14px 15px 14px 15px;

  cursor: pointer;

  font-size: 12px;
  font-weight: 400;
  color: inherit;

  border: none;
  border-top: solid 1px;
  border-color: rgb(50, 50, 50);

  :hover {
    background-color: rgb(40, 40, 40);
  }
`;

const Dropdown = ({ handleSearch, options, icon, iconSize }) => {
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(!expanded);
  };

  const close = () => {
    setExpanded(false);
  };

  const select = (option) => {
    if (option !== null) {
      handleSearch(option);
    }

    close();
  };

  return (
    <MainContainer>
      <DropdownButton onClick={() => expand()}>
        <FontAwesomeIcon icon={icon} color="white" size={iconSize} position="fixed" style={{ margin: ' 1px -3px 1px -3px' }} />
      </DropdownButton>

      <div>
        {(() => {
          if (expanded) {
            return (
              <DropdownContainer onBlur={close}>
                {options.map((option, i) => {
                  return (
                    <SubRedditOption backgroundColor="secondary" key={i} value={option} onClick={() => select(option)}>
                      <Text fontSize="13">r/{option}</Text>
                    </SubRedditOption>
                  );
                })}
              </DropdownContainer>
            );
          }
        })()}
      </div>
    </MainContainer>
  );
};

export default Dropdown;
