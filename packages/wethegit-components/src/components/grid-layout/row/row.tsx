import type { ElementType, ForwardedRef } from "react"

import { classnames, fixedForwardRef } from "@local/utilities"

import type { FlexProps } from "../../flex"
import { Flex } from "../../flex"

import styles from "./row.module.scss"

export type RowProps<T extends ElementType> = FlexProps<T> & {
  stackMedium?: boolean
}

export function UnwrappedRow<T extends ElementType = "div">(
  { stackMedium = false, className, ...props }: RowProps<T>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const classes = classnames([styles.row, stackMedium && styles.stackMedium, className])

  return <Flex ref={ref} className={classes} {...props} />
}

/**
 * A container within the component library's grid layout system. Most often used with `<Column>` components as children.
 *
 * The grid layout system does not apply to the `sm` breakpoint.
 */
export const Row = fixedForwardRef(UnwrappedRow)
