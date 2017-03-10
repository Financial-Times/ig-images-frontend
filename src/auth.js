import queryString from 'query-string';

let username;
let token;

const STORAGE_PREFIX = 'ig-images_';

export const get = () => ({ username, token });

export const redirectToLogin = () => {
  location.href = `https://s3o.ft.com/authenticate?redirect=${encodeURIComponent(location.href)}`;
};

// ensures the user has a valid token (redirects them away if not)
export const start = () => {
  // verify we are running on the expected domain - TODO
  // - replace body with message and ERROR OUT if not

  // handle case when this pageload is a redirection from s3o after a successful login
  {
    const query = queryString.parse(location.search);
    if (query.username && query.token) {
      // save them in localStorage
      localStorage.setItem(`${STORAGE_PREFIX}username`, query.username);
      localStorage.setItem(`${STORAGE_PREFIX}token`, query.token);

      // remove query string from location bar
      history.replaceState({}, '', location.href.split('?')[0]);
    }
  }

  // read username and token from local storage
  username = localStorage.getItem(`${STORAGE_PREFIX}username`);
  token = localStorage.getItem(`${STORAGE_PREFIX}token`);

  // redirect away if necessary
  if (!token) {
    redirectToLogin();
    return false;
  }

  return true;
};
