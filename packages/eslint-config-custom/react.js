module.exports = {
  extends: [
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "./base",
  ].map(require.resolve),
  globals: {
    JSX: true,
  },
}
