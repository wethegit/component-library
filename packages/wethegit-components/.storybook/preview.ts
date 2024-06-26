import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"

import { wtcTheme } from "./static/wtc-theme"

import "@wethegit/react-modal/style.css"
import "./styles/global-story-styles.scss"

const preview: Preview = {
  parameters: {
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

  tags: ["autodocs"],
}

export default preview
