const {
  REACT_APP_CLIENT_ID,
  REACT_APP_ISSUER,
  REACT_APP_DISABLE_HTTPS_CHECK,
} = process.env;

export default {
  oidc: {
    clientId: REACT_APP_CLIENT_ID || '0oa5j4bou0TOYSy0g357',
    issuer:
      REACT_APP_ISSUER
      || 'https://ft-test.okta.com/oauth2/aus1kd29jg5LHxiFu357',
    disableHttpsCheck:
      REACT_APP_DISABLE_HTTPS_CHECK != null
        ? REACT_APP_DISABLE_HTTPS_CHECK
        : true,
    redirectUri: `${window.location.origin}/implicit/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
};
