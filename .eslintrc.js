// docs
// https://eslint.org/docs/user-guide/configuring

// see airbnb rules here
// https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules

const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: true,
    },
  },
  rules: {
    semi: [error, 'always'],
    //'linebreak-style': [error, 'windows'],
    'linebreak-style': off,
    quotes: [error, 'single', { avoidEscape: true }],
    indent: [error, 4],
    'no-alert': error,
    'no-debugger': off,
    'no-console': off,
    camelcase: error,
    'no-else-return': [off, { allowElseIf: false }],
    'no-underscore-dangle': off,
    'max-classes-per-file': [error, 2],
    'import/prefer-default-export': off,
    'no-param-reassign': [error, { 'props': false }],
    'class-methods-use-this': off,
    'react/prop-types': off,
    'operator-linebreak': [error, 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
    'arrow-parens': [warn, 'as-needed']
  }
};
