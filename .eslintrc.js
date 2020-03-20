module.exports = {
  parser: 'babel-eslint',
  ignorePatterns: ['.gitignore'],
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'eslint-config-prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
    test: 'readonly',
    expect: 'readonly',
    require: 'readonly',
    __dirname: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0
  }
};
