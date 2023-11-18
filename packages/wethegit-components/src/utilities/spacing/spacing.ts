import styles from "./spacing.module.scss"

type SpacingRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface SpacingStops {
  margin: {
    [key: number]: string
    left: Record<SpacingRange, string> & { auto: string }
    right: Record<SpacingRange, string> & { auto: string }
    top: Record<SpacingRange, string>
    bottom: Record<SpacingRange, string>
    x: Record<SpacingRange, string> & { auto: string }
    y: Record<SpacingRange, string>
  }
  padding: {
    [key: number]: string
    left: Record<SpacingRange, string>
    right: Record<SpacingRange, string>
    top: Record<SpacingRange, string>
    bottom: Record<SpacingRange, string>
    x: Record<SpacingRange, string>
    y: Record<SpacingRange, string>
  }
}

type Spacing = SpacingStops & Omit<Breakpoints<SpacingStops>, "sm">

const total = 10

const spacing = {} as Spacing

const bps = ["md", "lg", "xl", "xxl"] as const

for (const bp of bps) {
  spacing[bp] ||= {} as SpacingStops

  for (let i = 0 as SpacingRange; i <= total; i++) {
    const directions = ["left", "right", "top", "bottom", "x", "y"] as const
    const properties = ["margin", "padding"] as const

    for (const prop of properties) {
      spacing[prop] ||= {} as Spacing["margin"]
      spacing[prop][i] = styles[`${prop}-${i}`]

      for (const dir of directions) {
        spacing[prop][dir] ||= {} as Spacing["margin"]["left"]
        spacing[prop][dir][i] = styles[`${prop}-${dir}-${i}`]

        spacing[bp][prop] ||= {} as Spacing["md"]["margin"]
        spacing[bp][prop][dir] ||= {} as Spacing["md"]["margin"]["left"]
        spacing[bp][prop][dir][i] = styles[`${prop}-${dir}-${bp}-${i}`]
      }
    }
  }

  const directions = ["left", "right", "x"] as const

  for (const dir of directions) {
    spacing[bp].margin[dir].auto = styles[`margin-${dir}-${bp}-auto`]
  }
}

const directions = ["left", "right", "x"] as const

for (const dir of directions) {
  spacing.margin[dir].auto = styles[`margin-${dir}-auto`]
}

console.log(spacing)

export { spacing }
