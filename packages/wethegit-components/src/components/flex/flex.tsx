import type { ElementType, ForwardedRef } from "react"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { buildBreakpointClassnames, classnames, fixedForwardRef } from "@local/utilities"

import styles from "./flex.module.scss"

export type FlexAlign = "flex-start" | "center" | "flex-end" | "baseline" | "stretch"

export type AlignBreakpoints = Partial<Breakpoints<FlexAlign>>

export type FlexJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"

export type JustifyBreakpoints = Partial<Breakpoints<FlexJustify>>

export type BooleanBreakpoints = Partial<Breakpoints<boolean>>

export type FlexDirection = "column" | "row" | "row-reverse"

export type DirectionBreakpoints = Partial<Breakpoints<FlexDirection>>

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
   * Flex-direction. Accepts a string or a `breakpoint-object`
   */
  flexDirection?: FlexDirection | DirectionBreakpoints
  /**
   * Whether or not to wrap children. Accepts a `boolean` or a `breakpoint-object`
   */
  wrap?: boolean | BooleanBreakpoints
}

/**
 * Simple, flexbox-based container component. Allows for breakpoint-specific settings for common things like justify-content, align-items, and more.
 *
 * Learn more about [Breakpoints](https://wethegit.github.io/component-library/?path=/docs/core-breakpoints--overview).
 */
export const Flex = fixedForwardRef(function Flex<TAs extends ElementType = "div">(
  {
    align = "center",
    justify = "center",
    flexDirection,
    wrap = true,
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

  const directionClassnames = buildBreakpointClassnames<FlexDirection>(
    flexDirection,
    styles,
    "direction"
  )

  const wrapClassnames = buildBreakpointClassnames<boolean>(wrap, styles, "wrap")

  const classes = classnames([
    styles.flex,
    alignClassnames,
    justifyClassnames,
    directionClassnames,
    wrapClassnames,
    className,
  ])

  return <Tag className={classes} ref={ref} {...props} />
})
