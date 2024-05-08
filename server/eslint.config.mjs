import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Possible Errors
      'no-console': 'warn',
      'no-debugger': 'warn',

      // Best Practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': ['warn', { 'args': 'none' }],

      // Variables
      'no-var': 'error',
      'prefer-const': 'warn',

      // Style
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-mixed-spaces-and-tabs': 'error',
      'space-infix-ops': 'error',
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'no-trailing-spaces': 'error',

      // Braces and Punctuation
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'semi-spacing': ['error', { 'before': false, 'after': true }],

      // ES6
      'arrow-parens': ['error', 'always'],
      'no-duplicate-imports': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // Comment Formatting
      'multiline-comment-style': ['error', 'starred-block'],
      'spaced-comment': ['error', 'always', { 'exceptions': ['-', '+'] }],
    },
  },
];
