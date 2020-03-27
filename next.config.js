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
        test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
        exclude: config.exclude,
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              limit: config.inlineImageLimit,
              fallback: require.resolve("file-loader"),
              publicPath: `${config.assetPrefix}/_next/static/images/`,
              outputPath: `${isProd ? "/mobile-apps/" : ""}static/images/`,
              name: "[name]-[hash].[ext]"
            }
          }
        ]
      });
      config.node = {
        fs: 'empty'
      };
      return config;
    },
  })
);
