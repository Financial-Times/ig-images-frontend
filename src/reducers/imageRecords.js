// @flow

import type { ImageRecordModel, Action } from '../types';

type State = Array<ImageRecordModel>;

export default (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'ADD_REMOTE_IMAGES':
      return [
        ...action.images.map(({ name, id }) => ({
          id,
          name,
          isLocal: false,
        })),
        ...state,
      ];

    case 'ADD_FILES':
      return [
        ...action.files.map(({ id, file }) => ({
          id,
          file,
          isLocal: true,
        })),
        ...state,
      ];

    case 'SET_IMAGE_UPLOADING':
      return state.map((imageRecord) => {
        if (action.id !== imageRecord.id) return imageRecord;
        return {
          ...imageRecord,
          status: 'uploading',
          uploadProgress: 0,
        };
      });

    case 'SET_IMAGE_REMOTE_NAME':
      return state.map((imageRecord) => {
        if (action.id !== imageRecord.id) return imageRecord;
        return {
          ...imageRecord,
          name: action.name,
        };
      });

    case 'HANDLE_IMAGE_UPLOAD_FAILED':
      return state.map((imageRecord) => {
        if (action.id !== imageRecord.id) return imageRecord;
        return {
          ...imageRecord,
          status: 'failed',
          uploadProgress: undefined,
        };
      });

    case 'HANDLE_IMAGE_PUBLISHED':
      return state.map((imageRecord) => {
        if (action.id !== imageRecord.id) return imageRecord;
        return {
          ...imageRecord,
          isLocal: false,
          status: 'uploaded',
          uploadProgress: 1,
          file: undefined,
        };
      });

    case 'SET_IMAGE_UPLOAD_PROGRESS':
      return state.map((imageRecord) => {
        if (action.id !== imageRecord.id) return imageRecord;
        return {
          ...imageRecord,
          uploadProgress: action.progress,
        };
      });

    case 'CLEAR_IMAGE_STATUS':
      return state.map((imageRecord) => {
        if (action.id !== imageRecord.id) return imageRecord;
        return {
          ...imageRecord,
          status: undefined,
        };
      });

    default:
      return state;
  }
};
