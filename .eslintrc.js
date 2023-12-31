module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['tsconfig.json'], sourceType: 'module' },
  plugins: ['@typescript-eslint/eslint-plugin', 'import-helpers'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: { node: true, jest: true },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [2],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/@nestjs|^mongoose|@automock/',
          '/domain/',
          '/infra/',
          '/application/',
          '/presentation/',
          ['index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
