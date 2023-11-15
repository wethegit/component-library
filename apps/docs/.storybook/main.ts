import { dirname, join, resolve } from "path"
import type { StorybookConfig } from "@storybook/react-vite"

const COMPONENTS_PACKAGE_PATH = resolve(
  __dirname,
  "../../../packages/wethegit-components/src"
)

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
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
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen",
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
            replacement: COMPONENTS_PACKAGE_PATH,
          },
          {
            find: "@local",
            replacement: COMPONENTS_PACKAGE_PATH,
          },
        ],
      },
    }
  },
  docs: {
    autodocs: true,
  },
}

export default config
