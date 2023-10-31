module.exports = {
  extends: [
    'plugin:prettier/recommended',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2018
  },
  root: true,
  'env': {
    'es6': true
  },
  ignorePatterns: ['.eslintrc.js'],
};
