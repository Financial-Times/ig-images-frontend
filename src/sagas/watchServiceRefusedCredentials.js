import { take } from 'redux-saga/effects';
import redirectToLogin from '../lib/redirectToLogin';

export default function* watchServiceRefusedCredentials() {
  yield take('SERVICE_REFUSED_CREDENTIALS');
  yield redirectToLogin();
}
