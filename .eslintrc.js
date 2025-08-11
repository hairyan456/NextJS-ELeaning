module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:unicorn/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'simple-import-sort',
    'sort-destructure-keys',
    'unicorn',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-useless-return': 'warn', // function có keyword return nhưng ko trả về giá trị nào.
    'prefer-const': 'warn', // ưu tiên dùng const nếu biến ko thay đổi giá trị
    'react/self-closing-comp': 'error', // khi component ko có children => viết dạng </> thay vì <> </>
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'], // vừa sử dụng space & tab cùng lúc thì báo lỗi

    // sort Props
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/no-empty-object-type': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      // Enforce that boolean variables are prefixed with an allowed verb
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'must', 'need'],
      },

      // Enforce that interface, types, enums names do not begin with an I/T/E
      //  {
      //   selector: ['typeLike', 'interface', 'enum'],
      //   format: ['PascalCase'],
      //   custom: {
      //     regex: '^(?![TIE][A-Z])',
      //     match: true,
      //   },
      // },

      // Enforce that function names are either in camelCase or PascalCase
      {
        selector: 'variable',
        types: ['function'],
        format: ['PascalCase', 'camelCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    'tailwindcss/no-custom-classname': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-unresolved': 'error',
    'import/order': 'off',
    'react/no-multi-comp': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/jsx-no-leaked-render': [
      'error',
      { validStrategies: ['coerce', 'ternary'] },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    // sort Props destructuring
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: true },
    ],
    // unicorn: check tên interface và tên file
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Props: true,
          ref: true,
          Ref: true,
          params: true,
          Params: true,
        },
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-structured-clone': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-callback-reference': 'warn',
    'import/named': 'off',
    'import/no-unresolved': 'off', // ko cho cảnh báo khi import từ types/enums.ts
  },
};
