# @wethegit/components

For how to use the components, see the [Documentation](https://wethegit.github.io/component-library/).

To learn how to contribute, continue reading.

## Developing

It's **important** to know that this library is **never** compiled. The source files are provided as is. They are meant to be **copied** into your project.

Make sure you using the required Node version from [nvmrc](../../.nvmrc).

You will develop and test the components with **Storybook**.

From the **root** of the repository, run:

```sh
yarn
yarn start
```

This will start Storybook and watch for changes in the components' source files.

### Adding components

When adding a new file, ensure the component is also exported from the main `src/components/index.tsx` file:

```tsx
// src/components/index.tsx
export * from "./button"
```

Export only the necessary pieces of the component and their types from the component's `index.tsx` file.

```tsx
// src/components/button/index.tsx
export { Button } from "./button"
export type { ButtonProps } from "./button"
```

### Dependencies

If your component requires node packages as dependencies, add them to the `peerDependencies` and `devDependencies`:

Run these command from this directory, **not** from the root, otherwise they will be dependencies to the whole monorepo.

First add as a **peer** dependency:

```sh
yarn add <package-name> -P
```

Then as a **dev** dependency:

```sh
yarn add <package-name> -D
```

### Node dependencies and types

If a component is using a node package without types, add a declaration file with the name of the package, without special characters, to the `./types` directory:

```ts
// ./types/<package-name>.d.ts
declare module "<package-name>"
```

### 🧩 You are not done yet!

After you have added your component and is ready to release it, you need to add it to the CLI.

Add an entry to [registry-index.ts](../wethegit-components-cli/src/registry-index.ts) following the required types described in that file.

After that's all done you can release a new version following the instructions in the [project's readme](../../README.md).
