// @flow

import { take, put, fork } from 'redux-saga/effects';
import queryString from 'query-string';
import redirectToLogin from '../lib/redirectToLogin';
import * as actions from '../actions';
import * as storedCredentials from '../lib/storedCredentials';
import watchFetchRemoteImages from './watchFetchRemoteImages';
import watchServiceRefusedCredentials from './watchServiceRefusedCredentials';
import watchPublishImage from './watchPublishImage';

export default function* rootSaga(): Generator<*, *, *> {
  yield take('START_UP');

  // handle user returning from a successful s3o login just now
  {
    const query = queryString.parse(location.search);
    if (query.username && query.token) {
      // save them in sessionStorage
      storedCredentials.set({ username: query.username, token: query.token });

      // remove query string from location bar, for tidiness
      history.replaceState({}, '', location.href.split('?')[0]);
    }
  }

  // read username and token from local storage
  const credentials = storedCredentials.get();

  // if no token found, redirect to login
  if (!credentials) {
    yield redirectToLogin();
    return;
  }

  // put credentials in the store
  yield put(actions.setAuthCredentials(credentials.username, credentials.token));

  // status: user seems to have auth credentials, which may or may not be valid

  // start the other sagas
  yield [
    fork(watchFetchRemoteImages),
    fork(watchPublishImage),
    fork(watchServiceRefusedCredentials),
  ];

  // fetch first batch of images - might result in a redirect to login, if invalid credentials
  yield put(actions.fetchRemoteImages());
}
