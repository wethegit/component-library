# @wethegit/components-cli

CLI companion for `@wethegit/components`. It allows you to initialize and add components to a project.

## Installation

```bash
yarn add -D @wethegit/components-cli
```

## Usage

```bash
npx @wethegit/components-cli --help
```

## Developing and testing

Make sure you using the required Node version from [nvmrc](./.nvmrc).

1. Run `yarn install` from the **root of the monorepo**, not from this package's directory.
2. `cd` into this package's directory and run `yarn dev`
3. Run `npm link`. **Note:** it MUST be `npm link` and not `yarn link`

Now that we have a local version of the package available we need a node project to test on. If you have one already, skip to step 3.

1. Create a new directory and `cd` into it.
2. Run `yarn init -y`
3. Run `npm link @wethegit/components-cli`

You should now be able to run `@wethegit/components-cli` from the command line.

## Building

`tsup` compiles `src/index.ts`, into a CommonJS format as well as their TypeScript types.

Run `yarn build` to confirm compilation is working correctly. You should see a folder `wethegit-components-cli/dist` which contains the compiled output.

```bash
wethegit-components
└── dist
    ├── index.d.ts  <-- Types
    └── index.js    <-- CommonJS version
```
