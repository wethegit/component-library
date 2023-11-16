import type { ElementType, ForwardedRef } from "react"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { buildBreakpointClassnames, classnames, fixedForwardRef } from "@local/utilities"

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

export type BooleanBreakpoints = Partial<Omit<Breakpoints<boolean>, "sm">>

export type FlexProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Alignment on the cross axis. Accepts a `string` or a `breakpoint-object`
   */
  align?: FlexAlign | AlignBreakpoints
  /**
   * Alignment on the main axis. Accepts a `string` or a `breakpoint-object`
   */
  justify?: FlexJustify | JustifyBreakpoints
  /**
   * Whether or not to wrap children. Accepts a `boolean` or a `breakpoint-object`
   */
  wrap?: boolean | BooleanBreakpoints
  /**
   * Whether or not to reverse the order of children. Accepts a `boolean` or a `breakpoint-object`
   */
  reverse?: boolean | BooleanBreakpoints
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component. Supports mobile-first, breakpoint-specific settings.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 *
 * Learn more about [Breakpoints](https://wethegit.github.io/component-library/?path=/docs/core-breakpoints--docs).
 */
export const Flex = fixedForwardRef(function Flex<TAs extends ElementType = "div">(
  {
    align = "center",
    justify = "center",
    wrap = true,
    reverse = false,
    className,
    ...props
  }: FlexProps<TAs>,
  ref: ForwardedRef<unknown>
) {
  const alignClassnames = buildBreakpointClassnames<FlexAlign>(align, styles, "align")

  const justifyClassnames = buildBreakpointClassnames<FlexJustify>(
    justify,
    styles,
    "justify"
  )

  const wrapClassnames = buildBreakpointClassnames<boolean>(wrap, styles, "wrap")

  const reverseClassnames = buildBreakpointClassnames<boolean>(reverse, styles, "reverse")

  const classes = classnames([
    styles.flex,
    alignClassnames,
    justifyClassnames,
    wrapClassnames,
    reverseClassnames,
    className,
  ])

  return <Tag className={classes} ref={ref} {...props} />
})
