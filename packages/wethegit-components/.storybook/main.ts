import { dirname, join } from "path"
import remarkGfm from "remark-gfm"
import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/index.mdx", "../src/**/*.mdx", "../src/**/*.stories.{js,jsx,ts,tsx}"],
  staticDirs: ["../public"],
  addons: [
    {
      name: getAbsolutePath("@storybook/addon-essentials"),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  docs: {
    defaultName: "Overview",
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
}

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}
