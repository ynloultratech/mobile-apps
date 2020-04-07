const withPWA = require('next-pwa');
const withOffline = require('next-offline');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withPWA(withOffline(withImages(withCSS({
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
      ? process.env.LOCALE_SUBPATHS
      : 'none',
  },
  webpack: (config, options) => {
    true,
    config.node = {
      fs: 'empty'
    };
    return config;
  },
  pwa: {
    dest: 'static'
  }
})
)));
