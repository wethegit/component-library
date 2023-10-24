# We The Collective Component Library

Minally styled, accessible, React component primitives that can be copy and pasted into your project.

### Philosophy

At We The Collective our projects are always visually drastically different. Having a design system with a fixed API and styles doesn't make sense.

These components are designed to be a foundation to be extended upon based on your project's requirements. They are meant to speed up work and provide easy of mind knowing that they are accessible and tested.

To extend that even further this library is developed so that components are copied into your project instead of being imported from a package.

## Getting Started

Check required node version in [`.nvmrc`](./.nvmrc).

Install:

```bash
npm install -D @wethegit/components-cli
```

Initialize the project with the CLI:

```bash
npx @wethegit/components-cli init
```

Install components:

```bash
npx @wethegit/components-cli add
```

## Development

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

1. **Which packages would you like to include?** – This shows which packages changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.

   1.1. Selected only the packages that changed and note that we **ONLY** publish the `@wethegit/components` and `@wethegit/component-cli` packages, everything else is used internally in the monorepo and the Storybook documentation is published separately to GitHub Pages.

2. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for or `enter` to skip.

   2.1. If doing the first major version, confirm you want to release.

3. **Which packages should have a minor bump?** – Press `space` to select the packages you want to bump versions for or `enter` to skip.

4. Write a summary for the changes.

5. Confirm the changeset looks as expected.

### Version the packages

To generate the changelogs and bump the versions of the packages, run:
`yarn version-packages`

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`.

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm.
