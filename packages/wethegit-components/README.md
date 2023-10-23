# @wethegit/components

Set of primitive components for React. Minimally styled. Accessible.
The goal of these component is to provide a solid base for your own components.

### Getting started

It's **important** to know that this library is **never** compiled. The source files are provided as is. They are meant to be **copied** into your project.

✨ For an optimal developer experience, use the [CLI](../wethegit-components-cli/README.md).

That being said, you can **still** use this library as a dependency if you want to, you most likely already have a bundler in place to handle your React codebase.

To do so, first make sure you are using `typescript` and that you include `node_modules/@wethegit/components/src` in your `tsconfig.json`'s `include` array.

Also, ensure that you have `sass` installed and configured in your bundler.

Then install the library:

```sh
npm install @wethegit/components
```

Import the global styles:

```tsx
import "@wethegit/components/src/styles/global.scss";
```

And use the components you need as you would any other React component:

```tsx
import { Button } from "@wethegit/components";
```

## Developing

Make sure you using the required Node version from [nvmrc](../../.nvmrc).

You will develop and test the components with Storybook.

From the root of the repository, run:

```sh
yarn install
yarn dev
```

This will start Storybook and watch for changes in the components' source files.

### Adding components

When adding a new file, ensure the component is also exported from the main `src/components/index.tsx` file:

```tsx
// src/components/index.tsx
export * from "./button";
```

Export only the necessary pieces of the component and their types from the component directory's `index.tsx` file.

```tsx
// src/components/button/index.tsx
export { Button } from "./button";
export type { ButtonProps } from "./button";
```

## 🧩 You are not done yet!

After you have added your component and is ready to release it, you need to add it to the CLI.

Add an entry to [component-index.ts](../wethegit-components-cli/src/component-index.ts) following the required types described in that file.

After that's all done you can release a new version following the instructions in the [project's readme](../../README.md).
