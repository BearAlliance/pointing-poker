module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint-config-prettier'
  ],
  parser: 'babel-eslint',
  ignorePatterns: ['.gitignore'],
  env: {
    browser: true,
    es6: true
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': { node: { extensions: ['.js', '.jsx'] } }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
    test: 'readonly',
    expect: 'readonly',
    require: 'readonly',
    __dirname: 'readonly',
    module: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'import'],
  rules: {
    'react/prop-types': 0,
    'import/extensions': [2, 'never'],
    'import/no-extraneous-dependencies': [2, { devDependencies: ['src/**'] }]
  }
};
