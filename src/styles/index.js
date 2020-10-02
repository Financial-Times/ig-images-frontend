import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite/no-important';
import { css, withStyles, ThemeProvider } from 'react-with-styles';

import DefaultTheme from './DefaultTheme';

ThemedStyleSheet.registerTheme(DefaultTheme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export {
  css, withStyles, ThemeProvider, ThemedStyleSheet,
};
