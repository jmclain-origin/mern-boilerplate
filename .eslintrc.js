// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    rules: {
        'import/prefer-default-export': 0,
        'prettier/prettier': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['error', { allowHigherOrderFunctions: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'none' }],
    },
};
