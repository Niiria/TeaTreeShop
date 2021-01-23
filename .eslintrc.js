module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],

  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'error',
    'linebreak-style': ['error', 'windows'],
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': 0,
  },
};
