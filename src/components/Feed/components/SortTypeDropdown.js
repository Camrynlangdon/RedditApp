import { useState } from 'react';
import { getData } from '../../../Utils';
import styled from 'styled-components';
import { Text, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 100%;
`;

const SortTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-left: 15px;
`;

const SortTimeDropdown = styled.div`
  position: absolute;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: rgb(35, 35, 35);
  border: solid 1px rgb(80, 80, 80);
  border-radius: 4px;

  padding: 0px 7px 0px 7px;
`;

const SortTimeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  min-width: 65px;
  margin: 0px 1px 0px 1px;
`;

const SortTypeDropdown = ({ currentSortType, setCurrentSortType, setCurrentSortTime, currentSortTime }) => {
  const { SortType, SortTimeFrame } = getData();
  const [sortTime, setSortTime] = useState(currentSortTime);
  const [sortType, setSortType] = useState(currentSortType);
  const [sortTimeDropdown, setSortTimeDropdown] = useState(false);
  const [sortTypeDropdown, setSortTypeDropdown] = useState(false);

  const changeSortTime = (time) => {
    setSortTime(time);
    setCurrentSortTime(time);
  };

  const changeSortType = (type) => {
    setSortType(type);
    setCurrentSortType(type);
  };

  const useTimeDropdown = () => {
    setSortTypeDropdown(false);
    setSortTimeDropdown(!sortTimeDropdown);
  };

  const useSortDropdown = () => {
    setSortTimeDropdown(false);
    setSortTypeDropdown(!sortTypeDropdown);
  };

  const SearchTimeContainer = () => {
    return (
      <div>
        <SortTimeButton onClick={useTimeDropdown}>
          <Text wordBreak="none">{sortTime}</Text>
          <ChevronDownIcon color="white" w={5} h={5} marginLeft="5px"></ChevronDownIcon>
        </SortTimeButton>

        <div>
          {sortTimeDropdown && (
            <SortTimeDropdown>
              <RadioGroup onChange={(e) => changeSortTime(e)} value={sortTime}>
                <Stack direction="column">
                  {Object.keys(SortTimeFrame).map((time, key) => {
                    return (
                      <Radio value={time} key={key}>
                        <Text>{time}</Text>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </SortTimeDropdown>
          )}
        </div>
      </div>
    );
  };

  const SortTypeContainer = () => {
    return (
      <div>
        <SortTimeButton onClick={useSortDropdown}>
          <Text wordBreak="none">{sortType}</Text>
          <ChevronDownIcon color="white" w={5} h={5} marginLeft="5px"></ChevronDownIcon>
        </SortTimeButton>

        <div>
          {sortTypeDropdown && (
            <SortTimeDropdown>
              <RadioGroup onChange={(e) => changeSortType(e)} value={sortType}>
                <Stack direction="column">
                  {Object.keys(SortType).map((type, key) => {
                    return (
                      <Radio value={type} key={key}>
                        <Text>{type}</Text>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </SortTimeDropdown>
          )}
        </div>
      </div>
    );
  };

  return (
    <MainContainer>
      <SortTypeContainer />
      {(() => {
        if (currentSortType === SortType.top) {
          return (
            <SortTimeContainer>
              <SearchTimeContainer></SearchTimeContainer>
            </SortTimeContainer>
          );
        }
      })()}
    </MainContainer>
  );
};

export default SortTypeDropdown;
