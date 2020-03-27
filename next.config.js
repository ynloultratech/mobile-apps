const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const isProd = (process.env.NODE_ENV || 'production') === 'production';
const assetPrefix = isProd ? '/mobile-apps' : '';

module.exports = withImages(
  withCSS({
    publicRuntimeConfig: {
      localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none',
    },
    exportPathMap: () => ({
      '/': { page: '/' },
      '/contact': { page: '/contact' },
    }),
    assetPrefix,
    webpack: (config, options) => {
      cssModules: true,
      config.module.rules.push({
        // enforce: 'pre',
        // test: /\.js?$/,
        // exclude: [/node_modules/],
        // loader: 'eslint-loader',
        options: {
          outputPath: `${isProd ? '/mobile-apps/' : ''}static/images/`,
        }
      });
      config.node = {
        fs: 'empty'
      };
      return config;
    },
  })
);
