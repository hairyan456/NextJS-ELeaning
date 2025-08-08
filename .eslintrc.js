module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-unused-vars": "error",
    // sort Props
    "react/jsx-sort-props": [
      "error",
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      // Enforce that boolean variables are prefixed with an allowed verb
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will", "must", "need"],
      },

      // Enforce that interface, types, enums names do not begin with an I/T/E
      // {
      //   "selector": ["typeLike","interface","enum"],
      //   "format": ["PascalCase"],
      //   "custom": {
      //     "regex": "^[^TIE]",
      //     "match": false
      //   }
      // },

      // Enforce that function names are either in camelCase or PascalCase
      {
        selector: "variable",
        types: ["function"],
        format: ["PascalCase", "camelCase"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"]
      },
    ],
    "prettier/prettier": ["error", { singleQuote: true, semi: false }], // yêu cầu dấu nháy đơn
  }
}
