/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('stylelint')(),
    require('postcss-reporter')({
      throwError: true,
    }),
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('postcss-css-variables'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
