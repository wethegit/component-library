import { dirname, join, resolve } from "path"

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")))
}

const config = {
  stories: [
    "../stories/introduction.mdx", // adding this first so it's the default page when you load the docs
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/preset-scss"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config) {
    // customize the Vite config here
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "@wethegit/components",
            replacement: resolve(__dirname, "../../../packages/wethegit-components/"),
          },
          {
            find: "@local",
            replacement: resolve(__dirname, "../../../packages/wethegit-components/src/"),
          },
        ],
      },
    }
  },
  docs: {
    autodocs: true,
  },
  managerHead: (head) => `
    ${head}
    <style>.css-grrwae[data-selected="true"], .css-grrwae[data-selected="true"] svg { color: #101820 !important; } </style>
  `,
}

export default config
