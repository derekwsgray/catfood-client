'use strict';

module.exports = {
<<<<<<< HEAD
    root: true,
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'ember'
    ],
    extends: [
        'eslint:recommended',
        'plugin:ember/recommended'
    ],
    env: {
        browser: true
    },
    rules: {},
    overrides: [
        // node files
        {
            files: [
                '.eslintrc.js',
                '.template-lintrc.js',
                'ember-cli-build.js',
                'testem.js',
                'blueprints/*/index.js',
                'config/**/*.js',
                'lib/*/index.js',
                'server/**/*.js'
            ],
            parserOptions: {
                sourceType: 'script',
                ecmaVersion: 2015
            },
            env: {
                browser: false,
                node: true
            },
            plugins: ['node'],
            rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
                // add your custom rules and overrides for node files here
                'no-console': 0,
                'arrow-parens': ['warn', 'as-needed', {
                    requireForBlockBody: true
                }],
                'semi': ['error', 'always', {
                    omitLastInOneLineBlock: false
                }],
                'max-lines': ['warn', {
                    max: 500,
                    skipBlankLines: true,
                    skipComments: true
                }],
                'max-depth': ['warn', {
                    max: 4
                }],
                'indent': ['error', 4, {
                    'SwitchCase': 1
                }], // (default: 4 spaces, not tabs.)
                'keyword-spacing': ["error", {
                    "before": true,
                    "after": true
                }],
                'curly': 'error',
                'object-curly-spacing': ["error", "always"],
                'no-else-return': 'error',
                'block-spacing': 'error',
                'key-spacing': ['error', {
                    'beforeColon': false,
                    // 'mode': 'miminum' // Not recognized until later ESLint version. Enable on upgrade.
                }],
                //'lines-between-class-members': ['error', 'always'], // Enable once the eslint add-on works with ESLint 5
                'padded-blocks': ['error', {
                    'classes': 'always'
                }],
                'no-nested-ternary': 'error',
                'no-var': 'error',
                'prefer-const': 'error',
                'no-path-concat': 'error',
                'array-bracket-spacing': ['error', 'never'],
                'eqeqeq': 'error',
                'no-template-curly-in-string': 'error',
                'no-await-in-loop': 'error',
                'require-await': 'error',
                //'no-magic-numbers': 'error', // Enable in another JIRA and also fix errors.
                'no-unused-expressions': 0, // Disable in favour of the chai-friendly version.

                // this can be removed once the following is fixed
                // https://github.com/mysticatea/eslint-plugin-node/issues/77
                'node/no-unpublished-require': 'off'
            })
        }
    ]
=======
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      },
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
>>>>>>> 0a3836d... v3.10.1...v3.27.0
};
