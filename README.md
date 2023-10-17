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

- [`apps/docs`](./apps/docs/README.md): Component documentation site with Storybook
- [`packages/wethegit-components-cli`](./packages/wethegit-components-cli/README.md): CLI companion for `@wethegit/components`
- [`packages/wethegit-components`](./packages/wethegit-components/README.md): Core React components
- [`packages/tsconfig`](./packages/tsconfig/README.md): Shared `tsconfig.json`s used throughout the monorepo
- [`packages/eslint-config-custom`](./packages/eslint-config-custom/README.md): ESLint config used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `yarn add`.

To learn more about each package, see the README in each package's folder.

### Compilation

Running `yarn build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

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

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`.

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm.