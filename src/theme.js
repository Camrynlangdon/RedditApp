import { extendTheme } from '@chakra-ui/react';

const config = {
  // initialColorMode: 'light',
  // useSystemColorMode: false,

  colors: {
    bg: {
      primary: 'rgba(20, 20, 20)',
    },
    black: {
      50: '#f5f3ef',
      100: '#e0dcd5',
      200: '#cbc4b9',
      300: '#b7ad9a',
      400: '#a3957c',
      500: '#000000',
      600: '#6b604d',
      700: '#4c4538',
      800: '#2e2921',
      900: '#100e0a',
    },
    gray: {
      50: '#edf2fc',
      100: '#d4d7e0',
      200: '#b9bcc6',
      300: '#9ca1ae',
      400: '#818796',
      500: '#686d7d',
      600: '#505562',
      700: '#393d46',
      800: '#21242c',
      900: '#070c15',
    },
    lilac: {
      50: '#feeef3',
      100: '#e2d3da',
      200: '#c8b7bf',
      300: '#b19aa5',
      400: '#9a7d8c',
      500: '#816472',
      600: '#654e59',
      700: '#49383f',
      800: '#2d2027',
      900: '#150811',
    },
    red: {
      50: '#ffe1ee',
      100: '#ffb1c8',
      200: '#ff7ea3',
      300: '#ff4c7f',
      400: '#ff1a5a',
      500: '#e60040',
      600: '#b40032',
      700: '#820023',
      800: '#500014',
      900: '#210007',
    },
    purple: {
      50: '#f0e8ff',
      100: '#cfbef8',
      200: '#ae94ec',
      300: '#8d69e3',
      400: '#6d3fda',
      500: '#5425c0',
      600: '#411d97',
      700: '#2e146d',
      800: '#1b0b43',
      900: '#0b021c',
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: 'white',
      },
    },
    Button: {
      baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',

        backgroundColor: 'black',
        padding: '14px 15px 14px 15px',

        borderRadius: '0',

        cursor: 'pointer',

        fontSize: '12px',
        fontWeight: '400',

        border: 'none',
        borderTop: 'solid 1px',
      },
    },
  },
};

const theme = extendTheme(config);

export default theme;
