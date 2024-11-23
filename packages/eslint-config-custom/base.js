module.exports = {
  extends: ["plugin:import/recommended", "prettier"],
  plugins: ["import"],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "storybook-static/",
    "**/*.{css, scss}",
    ".eslintrc.*",
    "dist/",
    ".stylelintrc.js",
  ],
  rules: {
    "import/no-default-export": "off",
    "import/no-named-as-default": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@local/**",
            group: "external",
            position: "after",
          },
        ],
        distinctGroup: true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/resolver": {
          typescript: {
            root: ["."],
            project: "./tsconfig.json",
          },
        },
      },
      rules: {
        "@typescript-eslint/no-base-to-string": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-empty-object-type": [
          "error",
          { allowInterfaces: "always" },
        ],
      },
    },
  ],
}
