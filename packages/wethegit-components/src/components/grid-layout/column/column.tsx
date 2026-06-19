import type { ElementType, ForwardedRef } from "react"

import { Tag } from "@local/components/tag/tag"
import type { TagProps } from "@local/components/tag/tag"
import { fixedForwardRef } from "@local/utilities/fixed-forward-ref/fixed-forward-ref"
import { buildBreakpointClassnames } from "@local/utilities/build-breakpoint-classnames/build-breakpoint-classnames"
import { classnames } from "@local/utilities/classnames/classnames"

import styles from "./column.module.scss"

export type ColumnBreakpoints = Partial<Omit<Breakpoints<number>, "sm">>
export type ColumnProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Number of flex-layout columns to span. Accepts a `number` or a `breakpoint-object`
   */
  span?: number | ColumnBreakpoints
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component.
 *
 * Supports mobile-first, breakpoint-specific settings but does not apply to the `sm` breakpoint, since at that size, the columns will always span the full width of the container.
 *
 * If no `span` prop is provided, the columns will fill the available space.
 */
export const Column = fixedForwardRef(function Column<TAs extends ElementType = "div">(
  { span, className, ...props }: ColumnProps<TAs>,
  ref: ForwardedRef<unknown>
) {
  const breakpointClassNames = buildBreakpointClassnames<number>(span, styles, "span")

  const classes = classnames([styles.column, breakpointClassNames, className])

  return <Tag className={classes} ref={ref} {...props} />
})
