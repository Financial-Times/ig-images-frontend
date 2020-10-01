import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageRecord from './ImageRecord';
import { css, withStyles } from '../styles';
import { publishImage } from '../actions';

const getStyles = () => ({
  imageRecordsList: {
    listStyle: 'none',
    paddingLeft: 0,

    // padding: '0 10px',
    // '@media (min-width: 740px)': { padding: '5px 20px' },
  },
});

const ImageRecordsList = ({ imageRecords, styles, onPublishClick }) => (
  <ul {...css(styles.imageRecordsList)}>
    {imageRecords.map((imageRecord) => (
      <li key={imageRecord.id}>
        <ImageRecord
          {...imageRecord}
          onPublishClick={() => {
            if (imageRecord.file) {
              onPublishClick(imageRecord.id, imageRecord.file);
            }
          }}
        />
      </li>
    ))}
  </ul>
);
ImageRecordsList.propTypes = {
  imageRecords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isLocal: PropTypes.bool.isRequired,
      uploadProgress: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  styles: PropTypes.objectOf(
    PropTypes.shape({
      imageRecordsList: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onPublishClick: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  imageRecords: state.imageRecords,
});

const mapDispatchToProps = (dispatch) => ({
  onPublishClick: (id, file) => {
    dispatch(publishImage(id, file));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(getStyles)(ImageRecordsList));
