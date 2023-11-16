import type { ElementType, ForwardedRef } from "react"

import { Flex } from "@local/components"
import type { FlexProps } from "@local/components"
import { classnames, fixedForwardRef } from "@local/utilities"

import styles from "./row.module.scss"

export type RowProps<T extends ElementType> = FlexProps<T> & {
  /**
   * Whether or not to stack children on the `md` breakpoint
   */
  stackMedium?: boolean
}

/**
 * A container within the component library's grid layout system. Most often used with `<Column>` components as children.
 *
 * The grid layout system does not apply to the `sm` breakpoint.
 */
export const Row = fixedForwardRef(function Row<T extends ElementType = "div">(
  { stackMedium = false, className, ...props }: RowProps<T>,
  ref: ForwardedRef<unknown>
) {
  const classes = classnames([styles.row, stackMedium && styles.stackMedium, className])

  return <Flex className={classes} ref={ref} {...props} />
})
