import { Switch, Box, Text, FormLabel, FormControl } from '@chakra-ui/react';

const NSFWToggleButton = ({ setShowNSFW, isChecked }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <FormControl
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        onChange={(e) => setShowNSFW(e.target.checked)}
      >
        <Switch id="nsfw-toggle" size="lg" colorScheme="red" paddingTop="15px" isChecked={isChecked} />
        <FormLabel htmlFor="nsfw-toggle" mb="0" color="white" fontSize="12px">
          NSFW
        </FormLabel>
      </FormControl>
    </Box>
  );
};

export default NSFWToggleButton;
