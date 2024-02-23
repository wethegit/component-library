import { classnames } from "@local/utilities"

import styles from "./breakpoint-snipe.module.scss"

export interface BreakpointSnipeProps {
  /**
   * The color variant of the breakpoint snipe. Use "light" for dark backgrounds and "dark" for light backgrounds.
   * @default "light"
   */
  variant?: "light" | "dark"
}

/**
 * A visual indicator of the current breakpoint
 */
export function BreakpointSnipe({ variant = "light" }: BreakpointSnipeProps) {
  return (
    <div
      className={classnames([
        styles.breakpointSnipe,
        variant === "dark" && styles.breakpointSnipeDark,
      ])}
    />
  )
}
