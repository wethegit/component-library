---
"@wethegit/components": major
"@wethegit/components-cli": patch
---

- COMP: Removes barrel files (`index.ts`) from each component. Barrel files are known to cause circular reference issues, and so we've opted to remove them in favor of explicit imports.
- COMP: Removes the CSS modules file from `useBreakpoints`, due to Next JS and Turbopack no longer supporting the `:export` feature. Instead, this value is hard-coded in the `use-breakpoints.ts` file now.
- COMP: Overhauls the flex `grid-layout` system:
  - Removes `Wrapper` component in favor of the new `variant` prop on the `Row` component.
  - Removes inline padding from `Column` components, in favor of flexbox's `gap` property. Way less of a learning curve here now for newcomers.
  - Adds a `flexDirection` prop to the `Flex` (and therefore the `Row`) component, to allow users to specify per-breakpoint flex directions.
    - This removes the need for the `reverse` prop, so that's now gone.
  - Refactors and renames the `grid-calc(n)` SCSS utility to be `get-column-width(n)`. This is more indicative of what it's used for.
- COMP: Updates the `grid-layout` system to use the latest standards created by We the Collective's Design Team. This introduces a `--grid-margin-width` CSS custom property, and updates the `Row` component's width and margin calculations to take the new value into account.
- COMP: Adds `margin: 0` to the `body` element in the CSS resets stylesheet.
- COMP: Fixes Github-flavored Markdown not working in Storybook
- COMP: Fixes static asset path on deployed Storybook (image group examples have broken images)
- CLI: Fixes SCSS import instructions syntax on the CLI after adding components
- CLI: Supports `deno` package manager.
