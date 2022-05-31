import { getData } from '../../../Utils';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const Dropdown = styled.select`
  color: white;
  width: 70px;
  height: 30px;
  background-color: inherit;

  border: 1px solid rgb(50, 50, 50);
  border-radius: 3px;
`;

const Option = styled.option`
  color: white;
  background-color: rgb(40, 40, 40);
  padding: 10px;

  border: 2px solid gray;
  border-radius: 4px;

  cursor: pointer;
`;

const SortTypeDropdown = ({ currentSortType, setCurrentSortType }) => {
  const { SortType } = getData();

  return (
    <MainContainer>
      <Dropdown
        placeholder="Sort Option"
        w="100px"
        color="white"
        bg="black"
        display="flex-start"
        onChange={(e) => setCurrentSortType(e.target.value)}
      >
        {Object.keys(SortType).map((type, key) => {
          return (
            <Option key={key} value={type}>
              {type}
            </Option>
          );
        })}
      </Dropdown>
    </MainContainer>
  );
};

export default SortTypeDropdown;
