import styles from "./colors.module.scss"

const colorNames = ["black", "white"] as const

type Color = (typeof colorNames)[number]

type ColorNamesToStyles = Record<Color, string>

export interface Colors {
  bg: ColorNamesToStyles
  text: ColorNamesToStyles
}

const colors = {} as Colors

for (const name of colorNames) {
  colors.bg ||= {} as Colors["bg"]
  colors.bg[name] = styles[`bg-${name}`]

  colors.text ||= {} as Colors["text"]
  colors.text[name] = styles[`text-${name}`]
}

export { colors }
