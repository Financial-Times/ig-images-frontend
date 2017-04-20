// @flow

type EndpointName = 'list' | 'get-upload-url';

type ServiceParams = {
  username: string,
  token: string,
  [string]: string,
};

const SERVICE_ROOT = 'https://xblolpjxek.execute-api.eu-west-1.amazonaws.com/';
const SERVICE_STAGE = 'production';

export class BadCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export const call = async (endpointName: EndpointName, params: ServiceParams): Object => {
  const allParams = {
    ...params,
    host: 'ig-images',
  };

  const query = Object.keys(allParams).map(name =>
    `${encodeURIComponent(name)}=${encodeURIComponent(allParams[name])}`,
  ).join('&');

  const url = `${SERVICE_ROOT}${SERVICE_STAGE}/${endpointName}?${query}`;

  const res = await fetch(url);

  // redirect to login if not authorised
  if (res.status === 401) {
    throw new BadCredentialsError(`The ${endpointName} service responded with a 401`);
  }

  if (!res.ok) throw new Error('Request failed for unknown reason');

  return res.json();
};
