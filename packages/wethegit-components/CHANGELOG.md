# @wethegit/components

## 3.0.2

### Patch Changes

- 701c246: Fixes an issue with the InViewItem component, where the delays were being caluculated incorrectly. For example, using a delay value of `8` would return a `0.4s` value instead of a `0.8s` value.

## 3.0.1

### Patch Changes

- 513aaaa: feature: support for react v19

## 3.0.0

### Major Changes

- 082a0e5: Upgraded the Modal component to use the latest (v3) @wethegit/react-modal version and the documentation is updated. For more information on what has changed on the latest version, head over to [@wethegit/react-modal changelog](https://github.com/wethegit/react-modal/blob/main/CHANGELOG.md)

## 2.3.11

### Patch Changes

- 17020be: feature: adds IntRange type helper
- 3a038ac: fix: adds use client to missing components

## 2.3.10

### Patch Changes

- d9b8ddd: fix: updates inView to latest version

## 2.3.9

### Patch Changes

- ff0108e: hotfix: deps versions

## 2.3.8

### Patch Changes

- 938cfe2: Adds missing prefix-less classnames for Column, Flex, and Text components.

## 2.3.6

### Patch Changes

- 87ff32e: Fixes various issues on the Flex, BackToTop, spacing, and Text components. Creates a useBreakpoints hook, and refactors BreakpointSnipe to use it.

## 2.3.5

### Patch Changes

- a8673be: fix: navigation docs and exports

## 2.3.4

### Patch Changes

- d121019: fix: stories being copied with TS files and TS dependecy version

## 2.3.3

### Patch Changes

- be07fc2: Adds BackToTop component and child spacing utilities.
- 8ce33dc: feature: adds lint-staged

## 2.3.2

### Patch Changes

- 91431fd: feature: adds tests to <Modal /> component

## 2.3.1

### Patch Changes

- 62688f9: (comp) fix: inView staggerChildren docs and base duration value

## 2.3.0

### Minor Changes

- 9a9ae39: (comp) feature: adds breakpoint snipe component

## 2.2.15

### Patch Changes

- 238afee: fix: accessibility utilities styles filename'

## 2.2.14

### Patch Changes

- de686ff: fix: spread props on `<Icon />`

## 2.2.13

### Patch Changes

- bee5f8b: Changes Icon to be more flexible

## 2.2.12

### Patch Changes

- 0d53dba: Fix aria-current selector
- 1167112: Add classnames to Modal

## 2.2.11

### Patch Changes

- 17b750c: Expose classnames utility; Minor changes to Navigation component

## 2.2.10

### Patch Changes

- 071f002: Normalize style file names and fix storybook static assets

## 2.2.9

### Patch Changes

- Reset release

## 2.2.8

### Patch Changes

- 3d1cc2c: Full set of components for WeTheGit
- 2645a69: Removes unnecessary @wethegit/react-hooks dependency.

  Added the InView component, animation utilities, and stylelint config updates to ignore React utility functions.

  Fix: ensures typescript is ignored if set to false and fix glob so it doesn't select stories

  Fix: changeset releases

  Adds visually-hidden links

## 2.2.7

### Patch Changes

- [#63](https://github.com/wethegit/component-library/pull/63) [`5e1fb2f`](https://github.com/wethegit/component-library/commit/5e1fb2f583258f1e5983ee5a135da2bc0d5bd232) Thanks [@marlonmarcello](https://github.com/marlonmarcello)! - Adds `<Modal />` component

## 2.2.6

### Patch Changes

- Adds `Icon` component

## 2.2.5

### Patch Changes

- Adds color utilities

## 2.2.4

### Patch Changes

- Adds Text component

## 2.2.3

### Patch Changes

- fix grid class names and improves reset

## 2.2.2

### Patch Changes

- Fix recursive typescript transformation. Fix prettier check. Ties config and regitry with types. Adds Tag component for generic components.

## 2.2.1

### Patch Changes

- Adds dependencies to components

## 2.2.0

### Minor Changes

- Adds global styles

## 2.1.1

### Patch Changes

- Adds the add command to the CLI

## 2.1.0

### Minor Changes

- Adds init command to CLI

## 2.0.0

### Major Changes

- CLI with dependencies

## 1.0.0

### Major Changes

- Initial release
