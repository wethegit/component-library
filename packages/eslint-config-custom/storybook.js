module.exports = {
  extends: ["./base.js", "plugin:storybook/recommended"],
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
        "mdx/code-blocks": false,
      },
    },
  ],
}
