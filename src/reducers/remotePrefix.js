// @flow

import type { ActionSetRemotePrefix } from '../types';

export default (state: ?string = null, action: ActionSetRemotePrefix): ?string => {
  switch (action.type) {
    case 'SET_REMOTE_PREFIX':
      return action.prefix;

    default:
      return state;
  }
};
