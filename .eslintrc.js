module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['gulpfile.js'],
      env: {
        browser: false,
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
