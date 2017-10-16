// @flow

import React from 'react';
import { connect } from 'react-redux';
import ImageRecord from './ImageRecord';
import { css, withStyles } from '../styles';
import { publishImage } from '../actions';
import type { ImageRecordModel } from '../types';

type Props = {
  imageRecords: ImageRecordModel[],
  styles: Object,
  onPublishClick: (id: number, file: File) => {},
};

const getStyles = () => ({
  imageRecordsList: {
    listStyle: 'none',
    paddingLeft: 0,

    // padding: '0 10px',
    // '@media (min-width: 740px)': { padding: '5px 20px' },
  },
});

const ImageRecordsList = ({ imageRecords, styles, onPublishClick }: Props) => (
  <ul {...css(styles.imageRecordsList)}>
    {imageRecords.map(imageRecord => (
      <li key={imageRecord.id}>
        <ImageRecord
          {...imageRecord}
          onPublishClick={() =>
            onPublishClick(imageRecord.id, imageRecord.file)}
        />
      </li>
    ))}
  </ul>
);

const mapStateToProps = state => ({
  imageRecords: state.imageRecords,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPublishClick: (id, file) => {
    dispatch(publishImage(id, file));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(getStyles)(ImageRecordsList));
