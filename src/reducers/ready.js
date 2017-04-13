// @flow

import type { ActionSetAppReady } from '../types';

type State = boolean;

const readyReducer = (state: State = false, action: ActionSetAppReady): State => {
  switch (action.type) {
    case 'SET_APP_READY':
      return true;

    default:
      return state;
  }
};

export default readyReducer;
