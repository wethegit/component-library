# @wethegit/components

Set of primitive components for React. Unstyled. Accessible.
The goal of these component is to provide a solid base for your own components.

Each file inside of `wethegit-components/src` is a component inside our design system.

It's **important** to know that this library is **never** compiled. The source files are provided as is. They are meant to be copied into your project. For an easy DX use the [CLI](../wethegit-components-cli/README.md).

That being said, you can **still** use this library as a dependency if you want to, you most likely already have a bundler in place to handle your React codebase.

## Adding components

When adding a new file, ensure the component is also exported from the entry `index.tsx` file:

```tsx:./src/index.tsx
export * from './button';
// Add new component exports here
```

Export only the necessary pieces of the component and their types from the component directory's `index.tsx` file.

```tsx:./src/button/index.tsx
export { Button } from "./button";
export type { ButtonProps } from "./button";
```
