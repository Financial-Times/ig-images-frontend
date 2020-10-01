// @flow

import type { Action } from '../types';

type State = { idToken: string, accessToken: string } | null;

const authenticationReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'SET_AUTH_CREDENTIALS':
      return {
        idToken: action.idToken,
        accessToken: action.accessToken,
      };

    default:
      return state;
  }
};

export default authenticationReducer;
