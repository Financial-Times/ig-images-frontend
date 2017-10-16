// @flow

import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import ImageRecordsList from './ImageRecordsList';
import Header from './Header';
import { addFiles } from '../actions';
import { css, withStyles } from '../styles';

const getStyles = () => ({
  app: {
    background: '#fff',
    paddingBottom: '20px',
  },
  app_draggingFiles: {
    background: '#f0ffee',
  },
  loadingGraphic: {
    background: '#f2f2f2',
    height: '100vw',
    width: '100vw',
    overflow: 'hidden',
    position: 'fixed',
    zIndex: '100',
    left: '0',
    top: '0',
  },
});

class App extends React.Component {
  constructor() {
    super();

    this.onBrowseClick = () => {
      this.dropzone.open();
    };
  }

  onBrowseClick: () => void;
  dropzone: Object;
  props: {
    styles: Object,
    ready: boolean,
    onFilesReceived: () => void,
  };

  render() {
    const { styles, onFilesReceived, ready } = this.props;

    if (!ready) {
      return <div {...css(styles.loadingGraphic)} />;
    }

    return (
      <Dropzone
        ref={(node) => {
          this.dropzone = node;
        }}
        disableClick
        maxSize={30000000}
        accept="image/png,image/jpeg,image/svg+xml"
        style={{}}
        onDrop={onFilesReceived}
      >
        {({ isDragActive, isDragReject }) => (
          <div
            {...css(
              styles.app,
              isDragActive ? styles.app_draggingFiles : null,
              isDragReject ? styles.app_filesRejected : null,
            )}
          >
            <Header onBrowseClick={this.onBrowseClick} />
            <ImageRecordsList />
          </div>
        )}
      </Dropzone>
    );
  }
}

const mapStateToProps = state => ({
  ready: state.ready,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFilesReceived: (files) => {
    dispatch(addFiles(files));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(getStyles)(App));
