// @flow

const STORAGE_PREFIX = 'ig-images-auth_';

type Credentials = {
  username: string,
  token: string,
};

export const get = (): Credentials | null => {
  const username = sessionStorage.getItem(`${STORAGE_PREFIX}username`);
  const token = sessionStorage.getItem(`${STORAGE_PREFIX}token`);

  if (username && token) return { username, token };

  return null;
};

export const set = ({ username, token }: Credentials) => {
  sessionStorage.setItem(`${STORAGE_PREFIX}username`, username);
  sessionStorage.setItem(`${STORAGE_PREFIX}token`, token);
};

export const clear = () => {
  sessionStorage.removeItem(`${STORAGE_PREFIX}username`);
  sessionStorage.removeItem(`${STORAGE_PREFIX}token`);
};
