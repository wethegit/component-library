# @wethegit/components-cli

CLI companion for `@wethegit/components`. It allows you to initialize and add components to a project.

## Usage

Install:

```bash
yarn add -D @wethegit/components-cli
```

Initialize the project, this step will create the required directories and install the required dependencies:

```bash
npx @wethegit/components-cli init
```

As part of the initialization process, the global styles will be copied to the specified directory, `src/styles` by default. Make sure you import them in your project.

Copied files use an alias named `@local/` to import other local files.

Your project must have this alias setup _OR_ you can simply do a find/replace and change it.

Finally, install any components you want to use:

```bash
npx @wethegit/components-cli add
```

## Developing and testing

Make sure you using the required Node version from [nvmrc](./.nvmrc).

1. Run `yarn install` from the **root of the monorepo**, not from this package's directory.
2. `cd` into this package's directory and run `yarn dev`
3. In another terminal run `npm link` from this package's directory. **Note:** it MUST be `npm link` and not `yarn link`

Now that we have a local version of the package available we need a node project to test on. If you have one already, skip to step 3.

1. Create a new directory and `cd` into it.
2. Run `yarn init -y`
3. Run `npm link @wethegit/components-cli`

You should now be able to run `@wethegit/components-cli` from the command line.

### Adding new types of registry items

At the moment, the CLI only supports `components` and `utilities`. If you want to add a new type of registry item, you need to:

1. Add a new type to [RegistryType](./src/registry-index.ts)
2. Set the source directory for the new type in [consts](./src/utils/consts.ts)

Those are the basic steps. If this new type require a new directory as destination from the user, we also need to set that up in the config:

1. Add a new property to [Config](./src/index.d.ts) and update [DEFAULT_CONFIG](./src/utils/consts.ts)
2. Resolve the path during config parsing in [resolveConfigPath](./src/utils/resolveConfigPaths.ts)
3. Prompt the user for the new path in [promptForConfig](./src/utils/promptForConfig.ts)

That's the gist of it. If there are any other places that need tweaking, Typescript will let you know.

## Building

`tsup` compiles `src/index.ts`, into a CommonJS format as well as their TypeScript types.

Run `yarn build` to confirm compilation is working correctly. You should see a folder `wethegit-components-cli/dist` which contains the compiled output.

```bash
wethegit-components
└── dist
    ├── index.d.ts  <-- Types
    └── index.js    <-- CommonJS version
```
