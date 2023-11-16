import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    // adding this first so it's the default page when you load the docs
    "../src/index.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  docs: {
    autodocs: true,
  }
}

export default config
