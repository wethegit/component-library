import type { ElementType } from "react"

import { Flex } from "@local/components/flex/flex"
import type { FlexProps } from "@local/components/flex/flex"
import { classnames } from "@local/utilities/classnames/classnames"

import styles from "./row.module.scss"

export type RowVariant = "block" | "flex"

export type RowProps<T extends ElementType> = FlexProps<T> & {
  /**
   * Whether to remove flexbox from the Row's styling and simply use "display: block". Used for simple "Wrapper" divs that are only used for adhering to the grid width and gutter sizing.
   */
  variant?: RowVariant
}

/**
 * A container within the component library's grid layout system. Most often used with `<Column>` components as children.
 *
 * By default, the flex layout system follows a "column" direction on sm, and "row" on md+.
 */
export function Row<T extends ElementType = "div">({
  variant = "flex",
  flexDirection,
  className,
  ...props
}: RowProps<T>) {
  return (
    <Flex
      className={classnames([
        styles.row,
        variant === "block" && styles.rowBlock,
        className,
      ])}
      flexDirection={
        typeof flexDirection === "string"
          ? flexDirection
          : { sm: "column", md: "row", ...(flexDirection ?? {}) }
      }
      {...props}
    />
  )
}
