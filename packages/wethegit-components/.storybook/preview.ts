import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"

import { wtcTheme } from "./wtc-theme"

import "./styles/global-story-styles.scss"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: wtcTheme,
    },
    backgrounds: {
      default: "wtc",
      values: [
        {
          name: "wtc",
          value: "#151f29",
        },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light-theme",
        dark: "dark-theme",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
