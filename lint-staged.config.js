module.exports = {
  linters: {
    'src/index.html': [
      'prettier --write',
      'htmlhint src/index.html -c htmlhintrc.json',
      'git add',
    ],
    'src/style.css': [
      'stylelint --fix --max-warnings 0',
      'git add',
    ],
    '*.js': [
      'eslint --fix --max-warnings 0 --no-ignore .eslintrc.js',
      'git add',
    ],
    './package.json': [
      'npmPkgJsonLint .',
      'npm update --dev',
      'git add',
    ],
    '*.json': [
      'prettier --write',
      'jsonlint',
      'git add',
    ],
    '*.md': [
      'markdownlint',
    ],
  },
  ignore: [
    './app.min.js',
    './style.min.css',
    './index.html',
  ],
};
