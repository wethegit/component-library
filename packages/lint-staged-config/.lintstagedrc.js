const config = {
  "!(*lintstagedrc).{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,css,scss}": ["prettier --write"],
}

export default config
