import type { ElementType, ForwardedRef } from "react"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { fixedForwardRef, buildBreakpointClassnames, classnames } from "@local/utilities"

import styles from "./column.module.scss"

export type ColumnBreakpoints = Partial<Omit<Breakpoints<number>, "sm">>
export type ColumnProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Remove gutter padding. Useful for nested flex-layouts
   */
  deep?: boolean
  /**
   * Number of flex-layout columns to span. Accepts a `number` or a `breakpoint-object`
   */
  span?: number | ColumnBreakpoints
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component.
 *
 * Supports mobile-first, breakpoint-specific settings but does not apply to the `small` breakpoint as at that size, the columns will always span the full width of the container.
 *
 * If no `span` prop is provided, the columns will fill the available space.
 */
export const Column = fixedForwardRef(function Column<TAs extends ElementType = "div">(
  { deep = false, span, className, ...props }: ColumnProps<TAs>,
  ref: ForwardedRef<unknown>
) {
  // build classnames from span prop
  const breakpointClassNames = buildBreakpointClassnames<number>(span, styles, "span")

  const classes = classnames([
    styles.column,
    deep && styles.deep,
    breakpointClassNames,
    className,
  ])

  return <Tag className={classes} ref={ref} {...props} />
})
