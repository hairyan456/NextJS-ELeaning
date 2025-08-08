module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      // Enforce that boolean variables are prefixed with an allowed verb
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will"]
      },
      // Enforce that all variables are either in camelCase or UPPER_CASE
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"]
      },
      // Enforce that all const variables are in UPPER_CASE
      {
        "selector": "variable",
        "modifiers": ["const"],
        "format": ["UPPER_CASE"]
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
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
      // Enforce that variable and function names are in camelCase
      {
        "selector": ["variable", "function"],
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },

    ],
  }
}
