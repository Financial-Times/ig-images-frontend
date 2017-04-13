// @flow

import React from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { css, withStyles } from '../styles';
import getImageServiceURL from '../lib/getImageServiceURL';
import getImageServiceSet from '../lib/getImageServiceSet';

const defaultThumbSize = 60;
const thumbSizes = [
  { pageWidth: 400, size: 80 },
  { pageWidth: 800, size: 120 },
  { pageWidth: 1000, size: 150 },
];

const renderableThumbSizes = [
  defaultThumbSize,
  ...thumbSizes.map(({ size }) => size),
  ...thumbSizes.map(({ size }) => size * 2),
].sort();

type Props = {
  name: string,
  remotePrefix: string,
  isLocal: boolean,
  uploadProgress: number,
  status: void | 'uploaded' | 'uploading' | 'failed',
  styles: Object,
  file: File & { preview: string },
  onPublishClick: () => {},
}

const getStyles = ({ subtleButton, activeBlue }) => ({
  container: {
    margin: '10px',
    '@media (min-width: 740px)': { margin: '20px' },

    position: 'relative',
    display: 'flex',
    maxWidth: '100%',
    overflow: 'hidden',
  },

  container_local: {},

  thumbContainer: {
    width: `${defaultThumbSize + 4}px`,
    minWidth: `${defaultThumbSize + 4}px`,
    height: `${defaultThumbSize + 4}px`,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#d4d4d4',
    position: 'relative',
    border: '2px solid #fff',

    ...thumbSizes.reduce((acc, { pageWidth, size }) => ({
      ...acc,
      [`@media (min-width: ${pageWidth}px)`]: {
        width: `${size + 4}px`,
        minWidth: `${size + 4}px`,
        height: `${size + 4}px`,
      },
    })),
  },

  thumbContainer_link: {
    ':hover': {
      border: `2px solid ${activeBlue}`,
    },
    ':focus': {
      outline: '0',
      border: `2px solid ${activeBlue}`,
    },
  },

  thumbnailImg: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: '#fff',
    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  },

  controlsContainer: {
    flex: '1',
    paddingLeft: '20px',
    position: 'relative',
  },

  urlBox: {
    fontSize: '12px',
    width: '100%',
    textOverflow: 'ellipsis',
    background: 'transparent',
    border: '0',
  },

  statusMessage: {
    color: activeBlue,
    fontSize: '14px',
  },

  button: {
    ...subtleButton,
    marginLeft: '-8px',
  },
});

const ImageRecord = ({
  name,
  isLocal,
  // isUploading,
  uploadProgress,
  remotePrefix,
  styles,
  file,
  onPublishClick,
  status,
  // recentlyUploaded,
  // recentlyFailed,
}: Props) => {
  const remoteURL = `${remotePrefix}${name}`; // useful even if not uploaded yet
  const url = isLocal ? file.preview : remoteURL;
  const thumbnailURL = isLocal ? url : getImageServiceURL(url, { height: '120', width: '120', fit: 'scale-down' });

  let srcSet;
  let sizes;
  if (!isLocal) {
    srcSet = getImageServiceSet(url, renderableThumbSizes, { fit: 'scale-down' });

    sizes = `${thumbSizes.reduceRight((acc, { pageWidth, size }) => [
      ...acc,
      `(min-width: ${pageWidth}px) ${size}px`,
    ], []).join(', ')}, ${defaultThumbSize}px`;
  }

  const img = (
    <img
      src={thumbnailURL}
      srcSet={srcSet}
      sizes={sizes}
      alt="Thumbnail"
      {...css(styles.thumbnailImg)}
    />
  );

  return (
    <div {...css(styles.container, isLocal && styles.container_local)}>
      {isLocal ?
        <div {...css(styles.thumbContainer)}>{img}</div> :
        <a href={url} {...css(styles.thumbContainer, styles.thumbContainer_link)}>{img}</a>
      }

      <div {...css(styles.controlsContainer)}>
        <div {...css(styles.buttonsRow)}>
          {isLocal && status !== 'uploading' ?
            <button onClick={onPublishClick} {...css(styles.button)}>Publish</button> :

            <CopyToClipboard text={remoteURL}>
              <button {...css(styles.button)}>Copy URL</button>
            </CopyToClipboard>
          }
        </div>

        <div {...css(styles.urlContainer)}>
          {!isLocal || status === 'uploading' ?
            <input readOnly value={remoteURL} {...css(styles.urlBox)} /> :
            null
          }
        </div>

        <div {...css(styles.statusMessage)}>
          {(() => {
            switch (status) {
              case 'uploading':
                return `Uploading: ${Math.round(uploadProgress * 100)}%`;
              case 'uploaded':
                return 'Uploaded ✅';
              case 'failed':
                return 'Upload failed ❌';
              default: return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  remotePrefix: state.remotePrefix,
});

export default connect(
  mapStateToProps,
)(withStyles(getStyles)(ImageRecord));
