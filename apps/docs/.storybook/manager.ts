import { addons } from "@storybook/manager-api"

import { wtcTheme } from "./wtc-theme"

addons.setConfig({
  theme: wtcTheme,
})
