import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

class App extends Component {
  constructor(props) {
    super(props);

    this.onBrowseClick = () => {
      if (!this.dropzone) throw new Error('dropzone should be defined');
      this.dropzone.open();
    };
  }

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

App.propTypes = {
  styles: PropTypes.objectOf(
    PropTypes.shape({
      loadingGraphic: PropTypes.string,
      app_draggingFiles: PropTypes.string,
      app_filesRejected: PropTypes.string,
    }),
  ).isRequired,
  ready: PropTypes.bool.isRequired,
  onFilesReceived: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ready: state.ready,
});

const mapDispatchToProps = (dispatch) => ({
  onFilesReceived: (files) => {
    dispatch(addFiles(files));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(getStyles)(App));
