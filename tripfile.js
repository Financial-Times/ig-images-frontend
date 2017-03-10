import 'dotenv/config';

import Directory from 'exhibit-directory';
import { compose, plugin, cache } from 'exhibit';
import cssnano from 'cssnano';

const src = new Directory('src');
const dist = new Directory('dist');

// hack to inject env vars in front-end code, until I find a better way
const replaceEnvVars = (content) => {
  let out = content.toString();

  Object.keys(process.env).forEach((name) => {
    const string = `process.env.${name}`;

    out = out.split(string).join(`'${process.env[name]}'`);
  });

  return out;
};

const preprocess = compose(
  cache((content, name) => {
    if (!name.endsWith('.js')) return content;

    return replaceEnvVars(content);
  }),
  plugin('babel', { root: 'src' }),
  plugin('browserify', {
    root: 'src',
  }),
  plugin('sass', { root: 'src' }),
  plugin('autoprefixer'),
);

const optimise = compose(
  plugin('postcss', cssnano(), { map: false }),
  plugin('babel', {
    root: 'src',
    presets: ['babili'],
    sourceMaps: false,
  }),
);

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
    plugin('serve', { reload: true }),
    dist.write,
  ));
};
