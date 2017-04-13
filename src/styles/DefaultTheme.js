const activeBlue = '#0076ff';
const greyText = '#585b60';
const greyLines = '#6a6981';
const offWhite = '#f5f5f5';
const lightGrey = '#cfcfcf';
const appleGreen = '#2aa62a';

const button = {
  cursor: 'pointer',
  color: greyText,
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '5px 7px',
  background: 'transparent',
  border: `2px solid ${greyLines}`,
  borderRadius: '4px',

  ':focus': {
    outline: '0',
    borderColor: activeBlue,
  },
  ':hover': {
    borderColor: activeBlue,
    color: activeBlue,
    background: '#fafafa',
  },
  ':active': {
    borderColor: appleGreen,
    color: appleGreen,
    background: '#fff',
  },
};

const subtleButton = {
  ...button,
  border: '2px solid transparent',
};

export default {
  activeBlue,
  greyText,
  offWhite,
  lightGrey,
  greyLines,

  button,
  subtleButton,
};
