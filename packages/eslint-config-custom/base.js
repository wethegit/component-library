const project = "./tsconfig.json"

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    ...["@vercel/style-guide/eslint/typescript"].map(require.resolve),
    "prettier",
    "plugin:import/recommended",
  ],
  plugins: ["import", "@typescript-eslint"],
  parserOptions: {
    project,
  },
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {
        root: ["."],
        project,
      },
    },
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "storybook-static/",
    "**/*.{css, scss}",
    ".eslintrc.*",
    "dist/",
  ],
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/no-base-to-string": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@local/**",
            group: "internal",
            position: "before",
          },
        ],
        distinctGroup: false,
      },
    ],
    "react/no-unescaped-entities": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
  },
}
