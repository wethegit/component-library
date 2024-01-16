import styles from "./color.module.scss"

const colorNames = ["black", "white"] as const

type ColorNames = (typeof colorNames)[number]

type ColorNamesToStyles = Record<ColorNames, string>

export interface Color {
  bg: ColorNamesToStyles
  text: ColorNamesToStyles
}

const color = {} as Color

for (const name of colorNames) {
  color.bg ||= {} as Color["bg"]
  color.bg[name] = styles[`bg-${name}`]

  color.text ||= {} as Color["text"]
  color.text[name] = styles[`text-${name}`]
}

export { color }
