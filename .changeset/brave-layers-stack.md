---
"@wethegit/components": major
---

Adds CSS cascade layers: `@layer reset, global, component, utility`.

- The reset, global custom properties, component styles and utility classes now each live in their own layer (`src/styles/_layers.scss`).
- Utility classes (color, spacing, visibility) now override component styles.
- **Breaking:** any unlayered consumer CSS now beats every library style, whatever its specificity. Global element selectors in your app (e.g. `a { color }`, `p { margin }`) may now override component styles they used to lose to.
