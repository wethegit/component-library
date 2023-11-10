import type { ElementType, ForwardedRef } from "react"

import { buildBreakpointClassnames, classnames, fixedForwardRef } from "@local/utilities"

import { Tag } from "../tag"
import type { TagProps } from "../tag"

import styles from "./flex.module.scss"

export type FlexAlign = "flex-start" | "center" | "flex-end" | "baseline" | "stretch"
export type AlignBreakpoints = Partial<Omit<Breakpoints<FlexAlign>, "sm">>

export type FlexJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
export type JustifyBreakpoints = Partial<Omit<Breakpoints<FlexJustify>, "sm">>

export type FlexProps<TAs extends ElementType> = TagProps<TAs> & {
  align?: FlexAlign | AlignBreakpoints
  justify?: FlexJustify | JustifyBreakpoints
  noWrap?: boolean
  reverse?: boolean
}

function UnwrappedFlex<TAs extends ElementType = "div">(
  {
    align = "center",
    justify = "center",
    noWrap = false,
    reverse = false,
    className,
    ...props
  }: FlexProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const alignClassnames = buildBreakpointClassnames<FlexAlign>(align, styles, "align")

  const justifyClassnames = buildBreakpointClassnames<FlexJustify>(
    justify,
    styles,
    "justify"
  )

  const classes = classnames([
    styles.flex,
    alignClassnames,
    justifyClassnames,
    noWrap && styles.noWrap,
    reverse && styles.reverse,
    className,
  ])

  return <Tag className={classes} ref={ref} {...props} />
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component. Supports mobile-first, breakpoint-specific settings.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 */
export const Flex = fixedForwardRef(UnwrappedFlex)
