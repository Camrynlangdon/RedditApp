import { Switch, Box, Text } from '@chakra-ui/react';

const NSFWToggleButton = (props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Switch size="lg" colorScheme="red" paddingTop="22px" onChange={props.onChange} />
      <Text fontSize="12px" paddingTop="3px">
        NSFW
      </Text>
    </Box>
  );
};

export default NSFWToggleButton;
