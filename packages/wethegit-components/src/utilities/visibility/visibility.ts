import styles from "./visibility.module.scss"

const classNames = [
  "smOnly",
  "mdOnly",
  "mdUp",
  "lgOnly",
  "lgUp",
  "xlOnly",
  "xlUp",
  "xxlUp",
] as const

export type VisibilityName = (typeof classNames)[number]

export type Visibility = Record<VisibilityName, string>

export const visibility = classNames.reduce((acc, name) => {
  const className = name.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase())

  acc[name] = styles[className]

  return acc
}, {} as Visibility)
