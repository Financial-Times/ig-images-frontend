import { put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../lib/api';
import redirectToLogin from '../lib/waitForAuth';

function* fetchRemoteImages() {
  // TODO receive the action, and if there's an 'offset', use it.

  const {
    authentication: { idToken, accessToken },
  } = yield select();

  // call the service!
  let response;
  try {
    response = yield api.call('list', { idToken, accessToken });
  } catch (error) {
    if (error instanceof api.BadCredentialsError) {
      yield redirectToLogin();
    } else throw error;
  }

  if (!response) throw new Error('Bad response from list API');

  const { images, prefix } = response;

  if (
    typeof prefix !== 'string'
    || !Array.isArray(images)
    || !images.every((item) => typeof item === 'string')
  ) {
    throw new Error('Bad response from list API');
  }

  yield put(actions.setRemotePrefix(prefix));

  yield put(actions.addRemoteImages(images)); // TODO with an offset

  yield put(actions.setAppReady());
}

export default function* watchFetchRemoteImages() {
  yield takeEvery('FETCH_REMOTE_IMAGES', fetchRemoteImages);
}
