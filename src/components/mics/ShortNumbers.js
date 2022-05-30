import { Text } from '@chakra-ui/react';

const ShortNumber = ({ number, fontSize = '11px' }) => {
  const shortenNum = (number) => {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1000000) {
      const newNum = String(number).slice(0, -3);
      const pointNum = String(number).slice(-3, -2);
      return newNum + '.' + pointNum + 'k';
    }
  };

  return (
    <Text
      wordBreak="none"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize={fontSize}
      padding=" 0 1px 0 1px"
      w="20px"
    >
      {shortenNum(number)}
    </Text>
  );
};

export default ShortNumber;
