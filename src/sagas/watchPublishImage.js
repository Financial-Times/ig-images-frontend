// @flow

import { delay, eventChannel, END } from 'redux-saga';
import { call, take, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../lib/api';

const COMPLETE = Symbol('complete');
const PROGRESS = Symbol('progress');
const FAILED = Symbol('failed');

const getFileUploadChannel = (url, file) =>
  eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url);

    xhr.upload.addEventListener(
      'progress',
      (event: Event & {
          lengthComputable: boolean,
          loaded: number,
          total: number,
        }) => {
        if (event.lengthComputable) {
          emitter({ type: PROGRESS, value: event.loaded / event.total });
        }
      },
    );

    xhr.addEventListener('load', () => {
      emitter({ type: COMPLETE });
      emitter(END);
    });

    xhr.addEventListener('error', () => {
      // NB. not taking 'error' arg here, because it causes a bug in Flow. But ideally we would log it.
      emitter({ type: FAILED });
      emitter(END);
    });

    xhr.send(file);

    return () => {
      xhr.abort();
    };
  });

export default function* watchPublishImage(): Generator<*, *, *> {
  yield takeEvery('PUBLISH_IMAGE', function* publishImage(action): Generator<*, *, *> {
    yield put(actions.setImageUploading(action.id));

    const { authentication: { username, token } } = yield select();

    const { url, name } = yield api.call('get-upload-url', {
      username,
      token,
      type: action.file.type,
    });

    yield put(actions.setImageRemoteName(action.id, name));

    const fileUploadChannel = yield call(
      getFileUploadChannel,
      url,
      action.file,
    );

    // TODO try takeEvery? when does this actually end?
    while (true) {
      // eslint-disable-line no-constant-condition
      const info = yield take(fileUploadChannel);

      switch (info.type) {
        case PROGRESS:
          yield put(actions.setImageUploadProgress(action.id, info.value));
          break;
        case COMPLETE:
          yield put(actions.handleImagePublished(action.id));
          yield delay(2500);
          yield put(actions.clearImageStatus(action.id));
          break;
        case FAILED:
          yield put(actions.handleImageUploadFailed(action.idea));
          yield delay(2500);
          yield put(actions.clearImageStatus(action.id));
          break;
        default:
          throw new Error('Unknown event type from file upload channel');
      }
    }
  });
}
