import { classnames } from "@local/utilities"

import styles from "./scalloped-edge.module.scss"

export interface ScallopedEdgeProps {
  /**
   * The color variant of the breakpoint snipe. Use "light" for dark backgrounds and "dark" for light backgrounds.
   * @default "light"
   */
  // variant?: "light" | "dark"
  className?: string
}

export function ScallopedEdge({
  // variant = "light",
  className,
  ...props
}: ScallopedEdgeProps) {
  return (
    <div
      className={classnames([
        styles.scallopedEdge,
        // variant === "dark" && styles.breakpointSnipeDark,
        className,
      ])}
      {...props}
      aria-hidden="true"
    />
  )
}
