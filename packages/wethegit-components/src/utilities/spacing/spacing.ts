import styles from "./spacing.module.scss"

// If changing this, make sure to update the same variable inside the module
const TOTAL_SPACE_CLASSES = 10
const BREAKPOINTS: Exclude<Breakpoint, "sm">[] = ["md", "lg", "xl", "xxl"]

// This should be the same amount as TOTAL_SPACE_CLASSES
type SpacingRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type SpacingMargin = Record<SpacingRange, string> & {
  left: Record<SpacingRange, string> & { auto: string }
  right: Record<SpacingRange, string> & { auto: string }
  top: Record<SpacingRange, string>
  bottom: Record<SpacingRange, string>
  x: Record<SpacingRange, string> & { auto: string }
  y: Record<SpacingRange, string>
}

type SpacingPadding = Record<SpacingRange, string> & {
  left: Record<SpacingRange, string>
  right: Record<SpacingRange, string>
  top: Record<SpacingRange, string>
  bottom: Record<SpacingRange, string>
  x: Record<SpacingRange, string>
  y: Record<SpacingRange, string>
}

interface SpacingStops {
  margin: SpacingMargin
  padding: SpacingPadding
}

type Spacing = SpacingStops & Omit<Breakpoints<SpacingStops>, "sm">

const spacing = {} as Spacing

for (const bp of BREAKPOINTS) {
  spacing[bp] ||= {} as SpacingStops

  for (let i = 0 as SpacingRange; i <= TOTAL_SPACE_CLASSES; i++) {
    const directions = ["left", "right", "top", "bottom", "x", "y"] as const
    const properties = ["margin", "padding"] as const

    for (const prop of properties) {
      spacing[prop] ||= {} as Spacing["margin"]

      // base spacing
      // e.g. spacing.margin[1]
      spacing[prop][i] = styles[`${prop}-${i}`]

      for (const dir of directions) {
        // base directional spacing
        // e.g. spacing.margin.left[1]
        spacing[prop][dir] ||= {} as Spacing["margin"]["left"]
        spacing[prop][dir][i] = styles[`${prop}-${dir}-${i}`]

        // breakpoint spacing
        // e.g. spacing.md.margin.left[1]
        spacing[bp][prop] ||= {} as Spacing["md"]["margin"]
        spacing[bp][prop][dir] ||= {} as Spacing["md"]["margin"]["left"]
        spacing[bp][prop][dir][i] = styles[`${prop}-${dir}-${bp}-${i}`]
      }
    }
  }

  // margin left/right/x can be set to auto
  const directions = ["left", "right", "x"] as const

  for (const dir of directions) {
    // breakpoint spacing
    // e.g. spacing.md.margin.left.auto
    spacing[bp].margin[dir].auto = styles[`margin-${dir}-${bp}-auto`]
  }
}

// margin left/right/x can be set to auto
const directions = ["left", "right", "x"] as const
for (const dir of directions) {
  // base auto spacing without breakpoint
  // e.g. spacing.margin.left.auto
  spacing.margin[dir].auto = styles[`margin-${dir}-auto`]
}

export { spacing }
