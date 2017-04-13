// @flow

import React from 'react';
import { css, withStyles } from '../styles';

type Props = {
  styles: Object,
  onBrowseClick: () => void,
};

const getStyles = ({ button, offWhite, lightGrey, greyText, activeBlue }) => ({
  header: {
    background: offWhite,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${lightGrey}`,
    // marginBottom: '20px',
    padding: '10px',
    '@media (min-width: 740px)': { padding: '20px' },
  },
  title: {
    margin: '0',
    fontSize: '20px',
  },
  instructions: {
    marginLeft: '10px',
  },
  browseButton: {
    ...button,
  },
  dragAndDropMessage: {
    display: 'none',
    '@media (min-width: 740px)': { display: 'inline' },
  },
  systemInfoLink: {
    textDecoration: 'none',
    color: greyText,
    ':hover': {
      color: activeBlue,
    },
  },
});

const Header = ({ styles, onBrowseClick }: Props) => (
  <header {...css(styles.header)}>
    <h1 {...css(styles.title)}>IG images</h1>

    <div {...css(styles.instructions)}>
      <button {...css(styles.browseButton)} onClick={onBrowseClick}>Browse</button>&nbsp;&nbsp;<span {...css(styles.dragAndDropMessage)}>or drop image files onto this page.</span>
    </div>

    <a {...css(styles.systemInfoLink)} href="https://dewey.ft.com/ig-images.html">About</a>
  </header>
);

export default withStyles(getStyles)(Header);
