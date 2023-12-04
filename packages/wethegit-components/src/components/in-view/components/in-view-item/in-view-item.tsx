import { useContext, useMemo } from "react"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { InViewContext } from "@local/components/in-view"
import {
  composeAnimateClassnames,
  composeStaggerClassnames,
} from "@local/components/in-view/utilities"
import { classnames, fixedForwardRef } from "@local/utilities"

import styles from "./in-view-item.module.scss"

export const DEFAULT_IN_VIEW_PRESETS = [
  "fade",
  "fromBottom",
  "fromBottomFixed",
  "fromLeft",
  "fromRight",
  "fromTop",
  "scaleUp",
] as const

export type Animation = (typeof DEFAULT_IN_VIEW_PRESETS)[number]
export type AnimationDelay = number
export type AnimationDuration = number

export type StaggerOptions = {
  animation?: Animation
  delay?: AnimationDelay
  duration?: AnimationDuration
  stagger?: number
}

export type InViewItemProps<TAs extends React.ElementType> = TagProps<TAs> & {
  /**
   * Animation to apply to the component.
   */
  animation?: Animation
  /**
   * Delay of the component's animation. If the `staggerChildren` option on a
   * parent InViewItem was provided with a delay, it will take priority over this.
   */
  delay?: AnimationDelay
  /**
   * Duration of the component's animation. If the `staggerChildren` option on a
   * parent InViewItem was provided with a duration, it will take priority over this.
   */
  duration?: AnimationDuration
  /**
   * Settings for stagger-animating the immediate children of the component.
   */
  staggerChildren?: StaggerOptions | boolean
}

export const InViewItem = fixedForwardRef(function InViewItem<
  TAs extends React.ElementType,
>(
  { animation, delay, duration, staggerChildren, ...props }: InViewItemProps<TAs>,
  ref: React.ForwardedRef<unknown>
) {
  const context = useContext(InViewContext)
  if (!context) throw new Error("<InViewItem> must be a descendent of <InView>.")

  const { as = "div", className, ...rest } = props

  const baseClasses = [styles.wrap, context.isInView && styles.inView]

  // Compose any CSS class names for animating the InViewItem *itself*:
  const animateClasses = useMemo(
    () => composeAnimateClassnames({ animation, delay, duration }),
    [animation, duration, delay]
  )

  // Compose any CSS class names for stagger-animating the *children*:
  const staggerChildrenClasses = useMemo(
    () => composeStaggerClassnames(staggerChildren),
    [staggerChildren]
  )

  const mergedClasses = classnames([
    baseClasses,
    animateClasses,
    staggerChildrenClasses,
    className,
  ])

  return <Tag as={as} ref={ref} className={mergedClasses} {...rest} />
})
