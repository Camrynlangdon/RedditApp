import { Switch, Box, Text, FormLabel, FormControl } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const NSFWToggleButton = ({ setShowNSFW, isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  const setCheckValue = (bool) => {
    setChecked(bool);
    setShowNSFW(bool);
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <FormControl
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        onChange={(e) => setCheckValue(e.target.checked)}
      >
        <Switch id="nsfw-toggle" size="lg" colorScheme="red" paddingTop="15px" isChecked={checked} />
        <Text fontSize="12px">NSFW</Text>
      </FormControl>
    </Box>
  );
};

export default NSFWToggleButton;
