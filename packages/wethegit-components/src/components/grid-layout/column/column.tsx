import type { ElementType, ForwardedRef } from "react"

import { fixedForwardRef, buildBreakpointClassnames, classnames } from "@local/utilities"

import { Tag } from "../../tag"
import type { TagProps } from "../../tag"

import styles from "./column.module.scss"

export type ColumnBreakpoints = Omit<Breakpoints<number>, "sm">
export type ColumnProps<TAs extends ElementType> = TagProps<TAs> & {
  deep?: boolean
  span?: number | ColumnBreakpoints
}

function UnwrappedColumn<TAs extends ElementType = "div">(
  { deep = false, span, className, ...props }: ColumnProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  // build classnames from span prop
  const breakpointClassNames = buildBreakpointClassnames<number>(span, styles, "span")

  const classes = classnames([
    styles.column,
    deep && styles.deep,
    breakpointClassNames,
    className,
  ])

  return <Tag className={classes} ref={ref} {...props} />
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component.
 *
 * Supports mobile-first, breakpoint-specific settings but does not apply to the `small` breakpoint as at that size, the columns will always span the full width of the container.
 *
 * If no `span` prop is provided, the columns will fill the available space.
 */
export const Column = fixedForwardRef(UnwrappedColumn)
