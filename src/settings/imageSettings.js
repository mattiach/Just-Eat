export const imageSettings = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false,
          },
          cleanupIDs: {
            minify: false,
            remove: false,
          },
          convertPathData: false,
        },
      },
      'sortAttrs',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
        },
      },
    ],
  },
  png: {
    quality: 90,
  },
  jpeg: {
    quality: 90,
  },
  jpg: {
    quality: 90,
  },
  tiff: {
    quality: 90,
  },
  // gif does not support lossless compression
  gif: {},
  webp: {
    lossless: true,
  },
  avif: {
    lossless: true,
  },
  cache: false,
  cacheLocation: undefined,
};