// @flow

import _ from 'lodash';

type Credentials = {
  idToken: string,
  accessToken: string,
};

const OKTA_CREDENTIAL_PATH = 'okta-token-storage';

export const get = (): Credentials | null => {
  const authData = localStorage.getItem(OKTA_CREDENTIAL_PATH);
  if (!authData) return null;

  const oktaData = JSON.parse(authData);

  const idToken = _.get(oktaData, 'idToken.value');
  const accessToken = _.get(oktaData, 'accessToken.value');
  if (idToken && accessToken) return { idToken, accessToken };

  return null;
};

export const clear = () => {
  localStorage.removeItem(OKTA_CREDENTIAL_PATH);
};
