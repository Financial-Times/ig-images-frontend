// import 'dotenv/config';

import { compose, plugin, cache, createMatcher } from 'exhibit';
import Directory from 'exhibit-directory';
import cssnano from 'cssnano';

const src = new Directory('src');
const dist = new Directory('dist', { log: true });
const isJSX = createMatcher('**/*.jsx');

const preprocess = compose(
  plugin('babel', { root: 'src' }),

  cache((content, name) => {
    // TODO should babel plugin automate this step?
    if (isJSX(name)) return { [name.replace(/\.jsx$/, '.js')]: content };
    return content;
  }),

  plugin('browserify', {
    root: 'src',
  }),
);

const optimise = compose(
  plugin('postcss', cssnano(), { map: false }),
  plugin('babel', {
    root: 'src',
    presets: ['babili'],
    sourceMaps: false,
  }),
);

export const clean = async () => {
  await dist.write({});
};

export const build = async ({ dev }) => {
  if (!dev) process.env.NODE_ENV = 'production';

  await src.read().then(compose(
    preprocess,
    dev ? null : optimise,
    dist.write,
  ));
};

export const develop = ({ prod }) => {
  if (prod) process.env.NODE_ENV = 'production';

  src.watch(compose(
    preprocess,
    prod ? optimise : null,
    dist.write,
  ));
};
