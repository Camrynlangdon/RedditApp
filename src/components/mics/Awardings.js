import styled from 'styled-components';
import { Box, Tooltip, Text } from '@chakra-ui/react';

const AwardsContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  background-color: rgb(40, 40, 40);
  border-radius: 3px;
  padding: 3px 2px 3px 2px;
  margin: 5px 8px 5px 8px;
`;

const Award = styled.div`
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(25, 25, 25);
  border-radius: 3px;
  padding: 2px 2px 2px 2px;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin: 0px 4px 0px 2px;
`;

const Awardings = ({ awards }) => {
  if (awards.length === 0) return;
  return (
    <AwardsContainer>
      {awards.map((award, index) => {
        return (
          <Award key={index}>
            <Tooltip label={award.name}>
              <Icon src={award.icon_url}></Icon>
            </Tooltip>
            <Text fontSize="10px" color="rgb(150, 150, 150)">
              {award.count}
            </Text>
          </Award>
        );
      })}
    </AwardsContainer>
  );
};

export default Awardings;
