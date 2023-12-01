import { createContext, ElementType, useMemo } from "react"
import { useInView } from "@wethegit/react-hooks"

import {
  composeAnimateClassnames,
  composeStaggerClassnames,
} from "@local/components/in-view/utilities"
import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames } from "@local/utilities"

import styles from "./in-view.module.scss"

export type InViewContext = {
  isInView: boolean
  domNode: HTMLElement | undefined
}

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

export type InViewProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Percentage of the entry within the viewport for it to be considered in
   * view; a number between 0 and 1.
   */
  threshold: number
  /**
   * Unobserve the entry once it is considered to be in view.
   */
  once: boolean
  /**
   * Consider the entry "in view" if it is above the viewport. This is most
   * often used for ensuring that content is already animated in, when loading
   * a document from a scroll position _other than_ the top.
   */
  setInViewIfScrolledPast: boolean
  /**
   * Ensure that the entry remains in view until it fully exits the viewport,
   * regardless of the threshold.
   */
  matchRootMarginToThreshold: boolean
  /**
   * Animation to apply to the component itself.
   */
  animation?: Animation
  /**
   * Delay of the main element's animation, if one was provided. The
   * `staggerChildren` option will inherit this delay value if it was specified
   * without one of its own.
   */
  delay?: AnimationDelay
  /**
   * Duration of the main element's animation, if one was provided. The
   * `staggerChildren` option will inherit this duration value if it was
   * specified without one of its own.
   */
  duration?: AnimationDuration
  /**
   * Settings for stagger-animating the immediate children of the component.
   */
  staggerChildren?: StaggerOptions | boolean
}

export const InViewContext = createContext<InViewContext>({
  isInView: false,
  domNode: undefined,
})

export function InView<TAs extends ElementType>({
  threshold = 0.3,
  once = false,
  setInViewIfScrolledPast = false,
  matchRootMarginToThreshold = true,
  animation,
  delay,
  duration,
  staggerChildren,
  ...props
}: InViewProps<TAs>) {
  const { as = "div", className, ...rest } = props

  const observerOptions = {
    threshold,
    ...(matchRootMarginToThreshold && {
      rootMargin: `${threshold * 100}% 0px 0px 0px`,
    }),
  }
  const [setRef, isInView, domNode] = useInView(
    observerOptions,
    once,
    setInViewIfScrolledPast
  )

  const baseClasses = isInView && styles.inView

  // Compose any CSS class names for animating the InView element *itself*:
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

  const value = {
    isInView,
    domNode,
  }

  return (
    <InViewContext.Provider value={value}>
      <Tag as={as} ref={setRef} className={mergedClasses} {...rest} />
    </InViewContext.Provider>
  )
}
