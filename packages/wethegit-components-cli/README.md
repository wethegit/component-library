# @wethegit/components-cli

CLI companion for `@wethegit/components`.

TODO:
1. Command to initiate the setup to use the components
1.1 Look through project setup for a config file
1.1.1 Check paths for components
1.1.1 Check paths for dependecies like hooks, context, etc
1.2 Bring default base required dependencies
1.3 Install dependencies

2. Command to install/copy component to project
2.1 Check installed component
2.2 Advanced: provide a diff of the component to be installed
2.3 Install component

## Building
`tsup` compiles `src/index.ts`, into a CommonJS format as well as their TypeScript types.

Run `yarn build` to confirm compilation is working correctly. You should see a folder `wethegit-components-cli/dist` which contains the compiled output.

```bash
wethegit-components
└── dist
    ├── index.d.ts  <-- Types
    └── index.js    <-- CommonJS version
```
