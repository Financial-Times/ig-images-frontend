// @flow

import getImageServiceURL from './getImageServiceURL';

export default (
  url: string,
  widths: number[],
  queryParams: {[string]: mixed} = {},
) =>
  widths.map(width =>
    `${getImageServiceURL(url, { ...queryParams, width, height: width })} ${width}w`,
  ).join(', ')
;
