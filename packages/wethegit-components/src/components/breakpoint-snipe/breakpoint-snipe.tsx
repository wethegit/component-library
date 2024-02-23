import { classnames } from "@local/utilities"

import styles from "./breakpoint-snipe.module.scss"

export interface BreakpointSnipeProps {
  /**
   * The color variant of the breakpoint snipe. Use "light" for dark backgrounds and "dark" for light backgrounds.
   * @default "light"
   */
  variant?: "light" | "dark"
  className?: string
}

/**
 * A visual indicator of the current breakpoint
 */
export function BreakpointSnipe({
  variant = "light",
  className,
  ...props
}: BreakpointSnipeProps) {
  return (
    <div
      className={classnames([
        styles.breakpointSnipe,
        variant === "dark" && styles.breakpointSnipeDark,
        className,
      ])}
      {...props}
      aria-hidden="true"
    />
  )
}
