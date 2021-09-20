'use strict';

module.exports = {
  root: true,

  extends: ['airbnb', 'plugin:react-with-styles/recommended', 'prettier'],

  plugins: ['prettier', 'react-with-styles'],

  env: {
    browser: true,
    node: true,
  },

  parser: 'babel-eslint',

  rules: {
    'jsx-a11y/click-events-have-key-events': 1, // TODO: enable
    'react-with-styles/no-unused-styles': 2,
    'no-restricted-imports': 0, // TODO: enable with full RTL support
    'react/jsx-props-no-spreading': 0, // TODO: re-evaluate
    'react/prop-types': 0,
    'react/no-deprecated': 1, // TODO: update to UNSAFE_componentWillReceiveProps
    'prettier/prettier': ['error'],
    'react/forbid-foreign-prop-types': 2, // For babel-plugin-transform-react-remove-prop-types
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-param-reassign': [2, { 'props': false }],
    'no-unused-vars': 0,
  },

  overrides: [
    {
      files: 'test/**/*',
      env: {
        mocha: true,
      },
      extends: 'airbnb',
      rules: {
        'react/jsx-props-no-spreading': 0,
        //"import/no-extraneous-dependencies": [2, {
        //"devDependencies": true
        //}],
        indent: [
          2,
          2,
          {
            MemberExpression: 'off',
          },
        ],
      },
    },
  ],

  settings: {
    react: {
      "version": "latest",
    },
    propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
  },
};
