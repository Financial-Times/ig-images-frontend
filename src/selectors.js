// @flow

import { createSelector } from 'reselect';

const getDimensions = state => state.dimensions;

export const getViewportWidth = createSelector(
  [getDimensions],
  dimensions => dimensions.viewportWidth,
);

export const getViewportHeight = createSelector(
  [getDimensions],
  dimensions => dimensions.viewportHeight,
);

export const getImageSize = createSelector(
  [getViewportWidth, getViewportHeight],
  (viewportWidth, viewportHeight) => {
    if (viewportWidth < 1000 || viewportHeight < 600) return 80;
    return 100;
  },
);
