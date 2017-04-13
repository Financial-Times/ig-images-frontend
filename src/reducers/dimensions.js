// @flow

import type { Action } from '../types';

type State = {
  viewportWidth: number,
  viewportHeight: number,
};

const defaultState = {
  viewportWidth: window.innerWidth || 320,
  viewportHeight: window.innerHeight || 800,
};

const dimensionsReducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'SET_VIEWPORT_SIZE':
      return {
        ...state,
        viewportWidth: action.width,
        viewportHeight: action.height,
      };

    default:
      return state;
  }
};

export default dimensionsReducer;
