---
"@wethegit/components": major
---

- Removes the CSS modules file from `useBreakpoints`, due to Next JS and Turbopack no longer supporting the `:export` feature. Instead, this value is hard-coded in the `use-breakpoints.ts` file now.
- Fixes a typo with the `useBreakpoints` hook, where the `sm` value maxed out at `693` instead of `639`.
- Updates the `grid-layout` system to use the latest standards created by We the Collective's Design Team. This introduces a `--grid-margin-width` CSS custom property, and updates the `Row` and `Wrapper` component width and margin calculations to take the new value into account.
- Adds `margin: 0` to the `body` element in the CSS resets stylesheet.
