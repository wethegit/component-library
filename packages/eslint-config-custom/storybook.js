module.exports = {
  extends: [
    "plugin:storybook/recommended",
    ...[
      "@vercel/style-guide/eslint/node",
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/react",
    ].map(require.resolve),
    "./base.js",
  ],
  plugins: ["storybook"],
  globals: {
    React: true,
    JSX: true,
  },
  overrides: [
    {
      files: ["*.mdx"],
      extends: "plugin:mdx/recommended",
      plugins: ["mdx"],
      settings: {
        "mdx/code-blocks": true,
      },
    },
  ],
}
