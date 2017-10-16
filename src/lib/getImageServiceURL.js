// @flow

export default (url: string, queryParams: { [string]: mixed } = {}) => {
  const finalQueryParams = { ...queryParams, source: 'ig' };

  const queryString = Object.keys(finalQueryParams)
    .sort()
    .map(name =>
      `${encodeURIComponent(name)}=${encodeURIComponent(String(finalQueryParams[name]))}`)
    .join('&');

  return `https://www.ft.com/__origami/service/image/v2/images/raw/${encodeURIComponent(url)}?${queryString}`;
};
