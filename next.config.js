const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withOffline(
  withImages(
    withCSS({
      publicRuntimeConfig: {
        localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
          ? process.env.LOCALE_SUBPATHS
          : 'none',
      },
      webpack: (config, options) => {
        cssModules: true,
        config.node = {
          fs: 'empty'
        };
        return config;
      },
    })
  )
);
