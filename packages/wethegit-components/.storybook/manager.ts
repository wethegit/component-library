import { addons } from "@storybook/manager-api"

import { wtcTheme } from "./static/wtc-theme"

addons.setConfig({
  theme: wtcTheme,
})
