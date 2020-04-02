module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended', 'eslint-config-prettier'],
  parser: 'babel-eslint',
  ignorePatterns: ['.gitignore'],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
    test: 'readonly',
    expect: 'readonly',
    require: 'readonly',
    __dirname: 'readonly',
    module: 'readonly',
    cy: 'readonly'
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
