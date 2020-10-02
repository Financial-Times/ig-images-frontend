// @flow

import {
  take, put, fork, all,
} from 'redux-saga/effects';
import * as actions from '../actions';
import watchFetchRemoteImages from './watchFetchRemoteImages';
import watchPublishImage from './watchPublishImage';
import waitForAuth from '../lib/waitForAuth';

export default function* rootSaga(): Generator<*, *, *> {
  yield take('START_UP');

  yield waitForAuth();

  // start the other sagas
  yield all([fork(watchFetchRemoteImages), fork(watchPublishImage)]);

  // fetch first batch of images - might result in a redirect to login, if invalid credentials
  yield put(actions.fetchRemoteImages());
}
