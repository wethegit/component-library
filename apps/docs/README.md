## Docs & Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. Storybook is configured to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@wethegit/components` for imports
- Write MDX for component documentation pages

### Useful Commands
- `yarn dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `yarn build`: Builds the Storybook UI and generates the static HTML files
- `yarn preview-storybook`: Starts a local server to view the generated Storybook UI