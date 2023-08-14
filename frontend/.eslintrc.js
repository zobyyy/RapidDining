module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['babel', 'jsx-a11y', 'proposal', 'prettier'],
  parser: '@babel/eslint-parser',
  extends: ['airbnb-base', 'plugin:jsx-a11y/recommended', 'next', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false
  },
  rules: {
    'no-param-reassign': 'off',
    'jsx-a11y/alt-text': 'off',
    'no-else-return': 'off',
    'import/newline-after-import': 'off',
    'spaced-comment': 'off',
    'jsx-quotes': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'prefer-destructuring': 'off',
    'import/order': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'proposal/class-property-semi': ['error', 'never'],
    // indent: ['error', 2, { SwitchCase: 1 }],
    indent: ['off'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: 'off',
    'semi-spacing': 'off',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': 'error',
    'key-spacing': 'error',
    'arrow-spacing': 'error',
    'space-infix-ops': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: 'off',
    'new-cap': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-unused-vars': 'off',
    'no-unreachable': 'error',
    'computed-property-spacing': ['error', 'never'],
    curly: ['error', 'all'],
    'no-unneeded-ternary': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'off'
  }
}
