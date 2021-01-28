module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['google', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2],
    'prettier/prettier': ['error', { singleQuote: true, printWidth: 120 }],
  },
  root: true,
};
