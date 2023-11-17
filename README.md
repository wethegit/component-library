# We The Collective Component Library

Minally styled, accessible, React component primitives that can be copy and pasted into your project.

[Documentation](https://wethegit.github.io/component-library/)

## Development

## Useful Commands

- `yarn build` - Build all packages, including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This monorepo includes the following packages and applications:

- [`packages/wethegit-components-cli`](./packages/wethegit-components-cli/README.md): CLI companion for `@wethegit/components`
- [`packages/wethegit-components`](./packages/wethegit-components/README.md): Core React components and documentation with Storybook
- [`packages/tsconfig`](./packages/tsconfig/README.md): Shared `tsconfig.json`s used throughout the monorepo
- [`packages/eslint-config-custom`](./packages/eslint-config-custom/README.md): ESLint config used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `yarn add`.

To learn more about each package, see the README in each package's folder.

### Compilation

Running `yarn build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

## Versioning & Publishing Packages

We use [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

### Generating the Changelog

To generate your changelog, run:

```sh
yarn changeset
```

1. **Which packages would you like to include?** – This shows which packages changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.

   1.1. Select only the packages that changed and note that we **ONLY** publish the `@wethegit/components` and `@wethegit/component-cli` packages, so even if others changed, never select them. Everything else is used internally in the monorepo and the Storybook documentation is published separately to GitHub Pages.

2. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for or `enter` to skip.

3. **Which packages should have a minor bump?** – Press `space` to select the packages you want to bump versions for or `enter` to skip.

   3.1 If you skip both 2 and 3, the changeset will be a **patch**.

4. Write a summary for the changes.

5. Confirm the changeset looks as expected.

Changeset will create a patch file and give you a link for it. Open it, make sure everything is okay.

### Versioning the packages

After you created the `changeset` update, you need to generate the changelogs and bump the versions of the packages, to do so run:

```sh
yarn version-packages
```

### Releasing

When you push your code to GitHub, to the `main` branch, the [GitHub Action](./.github/workflows/release.yml) will run the `release` script defined in the root `package.json`.

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm.
