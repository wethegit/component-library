export default {
  "!(*lintstagedrc).{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,css,scss}": ["prettier --write"],
}
