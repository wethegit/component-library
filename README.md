# Component Library
TODO: write about the philosophy of this library, why it exists, what it solves and provide a guide for contribution.

## Useful Commands

- `yarn build` - Build all packages, including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This monorepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `packages/wethegit-components-cli`: CLI companion for `@wethegit/components`
- `packages/wethegit-components`: Core React components
- `packages/tsconfig`: Shared `tsconfig.json`s used throughout the monorepo
- `packages/eslint-config-custom`: ESLint config used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `yarn add`.

This example sets up your `.gitignore` to exclude all generated files, other folders like `node_modules` used to store your dependencies.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with `tsup`, which uses `esbuild` to greatly improve performance.

Running `yarn build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

For `wethegit-components`, the `build` command is the following:

```bash
tsup src/index.tsx --format esm,cjs --dts --external react
```

`tsup` compiles `src/index.tsx`, which exports all of the components in the design system, into both ES Modules and CommonJS formats as well as their TypeScript types. The `package.json` for `wethegit-components` then instructs the consumer to select the correct format:

```json:wethegit-components/package.json
{
  "name": "@wethegit/components",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `yarn build` to confirm compilation is working correctly. You should see a folder `wethegit-components/dist` which contains the compiled output.

```bash
wethegit-components
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

## Components

Each file inside of `wethegit-components/src` is a component inside our design system.
When adding a new file, ensure the component is also exported from the entry `index.tsx` file:

```tsx:wethegit-components/src/index.tsx
import * as React from "react";
export { Button, type ButtonProps } from "./Button";
// Add new component exports here
```

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. This example preconfigures Storybook to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@wethegit/components` for imports
- Write MDX for component documentation pages

- `yarn dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `yarn build`: Builds the Storybook UI and generates the static HTML files
- `yarn preview-storybook`: Starts a local server to view the generated Storybook UI

## Versioning & Publishing Packages

We use [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

### Generating the Changelog

To generate your changelog, run `yarn changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1.1 We ONLY publish the `@wethegit/components` and `@wethegit/component-cli` packages, everything else is used internally in the monorepo and the Storybook documentation is published to GitHub Pages.
2. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
3. If doing the first major version, confirm you want to release.
4. Write a summary for the changes.
5. Confirm the changeset looks as expected.
6. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Version the packages
To generate the changelogs and bump the versions of the packages, run:
`yarn version-packages`

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=@wethegit/components-docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm.