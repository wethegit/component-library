import styles from "./visibility.module.scss"

const classNames = [
  "sm-only",
  "md-only",
  "md-up",
  "lg-only",
  "lg-up",
  "xlg-only",
  "xlg-up",
  "xxlg-up",
] as const

export type VisibilityName = (typeof classNames)[number]

export type Visibility = Record<VisibilityName, string>

export const visibility = classNames.reduce((acc, name) => {
  acc[name] = styles[`bg-${name}`]
  return acc
}, {} as Visibility)
