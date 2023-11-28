import { createContext, ElementType } from "react"
import { useInView } from "@wethegit/react-hooks"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames } from "@local/utilities"

import styles from "./in-view.module.scss"

export type InViewContextType = {
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

export type AnimationOptions = {
  /**
   * Either an animation preset (string) to use, or a boolean.
   */
  animation?: Animation
  delay?: number
  duration?: number
  stagger?: number
}

export type InViewProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Percentage of the entry within the viewport for it to be considered
   * in view; a number between 0 and 1.
   */
  threshold: number
  /**
   * Unobserve the entry once it is considered to be in view.
   */
  once: boolean
  /**
   * Consider the entry "in view" if it is above the viewport. This is
   * most often used for ensuring that content is already animated in, when
   * loading a document from a scroll position _other than_ the top.
   */
  setInViewIfScrolledPast: boolean
  /**
   * Ensure that the entry remains in view until it fully exits the
   * viewport, regardless of the threshold.
   */
  matchRootMarginToThreshold: boolean
  /**
   * Settings for stagger-animating the immediate children of the component.
   * Default animation properties include `fade`, `scaleUp`, `fromBottom`,
   * `fromBottomFixed`, `fromTop`, `fromRight`, and `fromLeft`
   */
  staggerChildren?: AnimationOptions
}

export const InViewContext = createContext<InViewContextType>({
  isInView: false,
  domNode: undefined,
})

/**
 * Returns a class name string with the float value multiplied by 10
 * appended to it, because class names cannot have decimals.
 *
 * @param name The property to prepend the class name with.
 * @param value Float value corresponding to seconds.
 *
 * @example
 * generateStaggerClassName("delay", 0.2) // => styles.delay2
 */
const generateFloatClassName = (name: string, value: number) => {
  return styles[name + Math.floor(value * 10)]
}

export function InView<TAs extends ElementType>({
  threshold = 0.3,
  once = false,
  setInViewIfScrolledPast = false,
  matchRootMarginToThreshold = true,
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

  const {
    animation = "fade",
    stagger = 0.2,
    delay = 0,
    duration = 0.4,
  } = staggerChildren || {}

  const staggerChildrenClasses = staggerChildren
    ? classnames([
        styles.staggerChildren,
        animation && styles[animation],
        !isNaN(stagger) && generateFloatClassName("staggerAmount", stagger),
        !isNaN(delay) && generateFloatClassName("staggerDelay", delay),
        !isNaN(duration) && generateFloatClassName("staggerDuration", duration),
      ])
    : null

  const baseClasses = classnames([styles.wrap, isInView && styles.wrapInView])

  const mergedClasses = classnames([baseClasses, staggerChildrenClasses, className])

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
