# @wethegit/components-cli

CLI companion for `@wethegit/components`. It allows you to initialize and add components to a project.

For how to use the components in your project, see the [Documentation](https://wethegit.github.io/component-library/).

To learn how to contribute, continue reading.

## Developing

Make sure you using the required Node version from [nvmrc](./.nvmrc).

1. Run `yarn install` from the **root of the monorepo**, not from this package's directory.
2. `cd` into this package's directory and run `yarn dev`
3. In another terminal run `npm link` from this package's directory. **Note:** it MUST be `npm link` and not `yarn link`

Now that we have a local version of the package available we need a node project to test on. If you have one already, skip to step 3.

1. Create a new directory and `cd` into it.
2. Run `yarn init -y`
3. Run `npm link @wethegit/components-cli`

You should now be able to run `npx @wethegit/components-cli init/add` from the command line.

### Adding new category of registry items

If you'd like to add a new category of registry item, you need to:

1. Add a new category to [RegistryCategory](./src/registry-index.ts)
2. Set the source directory for the new category in [consts](./src/utils/consts.ts)

Those are the basic steps. If this new category require a new directory as destination from the user, we also need to set that up in the config:

1. Add a new property to [Config](./src/index.d.ts) and update [DEFAULT_CONFIG](./src/utils/consts.ts)
2. Resolve the path during config parsing in [resolveConfigPath](./src/utils/resolve-config-paths.ts)
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
