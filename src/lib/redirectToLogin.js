import { delay } from 'redux-saga';

const redirectToLogin = async () => {
  const loginURL = `https://s3o.ft.com/v2/authenticate?host=ig-images&redirect=${encodeURIComponent(location.href)}`;

  location.href = loginURL;

  await delay(3000);

  throw new Error(`Failed to redirect to login URL: ${loginURL}`);
};

export default redirectToLogin;
