module.exports = {
  "!(*lintstagedrc).{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,mdx,css,scss}": ["prettier --write"],
}
