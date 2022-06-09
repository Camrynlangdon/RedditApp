import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

const MainContainer = styled.div``;

const msToDate = (ms) => {
  //console.log(ms);
  const date = new Date(ms * 1000);

  return timeSince(date);
};

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + 'y';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'm';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'd';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + 'h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + 'm';
  }
  return Math.floor(seconds) + 's';
}

const TimeStamp = ({ msTime }) => {
  return (
    <MainContainer>
      <Text variant="user">{msToDate(msTime)}</Text>
    </MainContainer>
  );
};

export default TimeStamp;
