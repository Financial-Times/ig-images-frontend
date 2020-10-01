import { put, retry } from 'redux-saga/effects';
import * as storedCredentials from './storedCredentials';
import * as actions from '../actions';

function _checkForOKtaCredentials() {
  return new Promise((resolve, reject) => {
    const credentials = storedCredentials.get();
    if (credentials) {
      resolve(credentials);
    } else {
      reject();
    }
  });
}

const SECOND = 1000;
function* waitForAuth() {
  const response = yield retry(5, SECOND, _checkForOKtaCredentials);
  yield put(actions.setAuthCredentials(response.idToken, response.accessToken));
}

export default waitForAuth;
