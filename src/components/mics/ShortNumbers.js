import react from 'react';
import { Text } from '@chakra-ui/react';

const ShortNumber = ({ number }) => {
  const shortenNum = (number) => {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1000000) {
      const newNum = String(number).slice(0, -3);
      console.log(newNum);
      return newNum + 'k';
    }
  };

  return (
    <Text display="flex" justifyContent="center" alignItems="center" fontSize="11px" padding=" 0 1px 0 1px" w="20px">
      {shortenNum(number)}
    </Text>
  );
};

export default ShortNumber;
