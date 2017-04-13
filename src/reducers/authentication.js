// @flow

import type { Action } from '../types';

type State =
  | { username: string, token: string}
  | null
;

const authenticationReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'SET_AUTH_CREDENTIALS':
      return {
        username: action.username,
        token: action.token,
      };

    default:
      return state;
  }
};

export default authenticationReducer;
