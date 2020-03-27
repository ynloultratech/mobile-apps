const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const webpack = require('webpack');
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
    assetPrefix: assetPrefix,
    webpack: (config, options) => {
      cssModules: true,
      //      config.module.rules.push({
      //          enforce: 'pre',
      //          test: /\.js?$/,
      //          exclude: [/node_modules/],
      //          loader: 'eslint-loader',
      //          options: {
      //            quiet: true,
      //          }
      //      });
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix),
        }),
      );
      config.node = {
        fs: 'empty'
      }
      return config;
    },
  })
);
