import * as auth from './auth';

const { waitForCondition } = window.bootController;

const callService = async (endpointName, params) => {
  const { username, token } = auth.get();

  const extra = (
    params ?
    Object.keys(params).map(name =>
      `${encodeURIComponent(name)}=${encodeURIComponent(params[name])}`,
    ).join('&') :
    ''
  );

  const url = `${process.env.SERVICE_ROOT}${encodeURIComponent(process.env.SERVICE_STAGE)}/${endpointName}?host=${encodeURIComponent(process.env.AUTH_HOST)}&username=${encodeURIComponent(username)}&token=${encodeURIComponent(token)}${extra}`;

  const res = await fetch(url);

  // redirect to login if not authorised
  if (res.status === 401) {
    auth.clear();
    auth.redirectToLogin();
    await { then: () => {} }; // just hang here until redirected
  }

  if (!res.ok) throw new Error('Request failed');

  return res.json();
};

waitForCondition('Polyfilled', async () => {
  // handle auth
  if (!auth.start()) return;

  const html = document.documentElement;

  // load list of images
  const list = await callService('list');

  // display images
  {
    const imagesContainer = document.querySelector('.images');

    list.images.forEach((name) => {
      const img = new Image();
      const originalURL = `${list.prefix}${name}`;

      img.src = `https://www.ft.com/__origami/service/image/v2/images/raw/${encodeURIComponent(originalURL)}?source=ig&height=120&dpr=${Math.round(devicePixelRatio)}`;

      img.setAttribute('height', 120);

      imagesContainer.appendChild(img);
    });
  }

  // set up dragzone on body TODO

  html.classList.add('ready');
});
