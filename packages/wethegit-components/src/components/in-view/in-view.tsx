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

export type InViewProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Percentage of the entry within the viewport for it to be considered
   * "in view". Expects a number between 0 and 1.
   */
  threshold: number
  /**
   * Unobserve the entry once it is considered to be in view.
   */
  once: boolean
  /**
   * Consider the entry as "in view" if it is above the viewport. This is
   * most often used for ensuring that content is already animated in, when
   * loading a document from a scroll position _other than_ the top.
   */
  setInViewIfScrolledPast: boolean
  /**
   * Ensure that the entry remains in view until it fully exits the
   * viewport, regardless of the threshold.
   */
  matchRootMarginToThreshold: boolean
}

export const InViewContext = createContext<InViewContextType>({
  isInView: false,
  domNode: undefined,
})

export function InView<TAs extends ElementType = "div">({
  threshold = 0.3,
  once = false,
  setInViewIfScrolledPast = false,
  matchRootMarginToThreshold = true,
  className,
  ...props
}: InViewProps<TAs>) {
  const observerOptions = {
    threshold,
    ...(matchRootMarginToThreshold && { rootMargin: `${threshold * 100}% 0px 0px 0px` }),
  }
  const [setRef, isInView, domNode] = useInView(
    observerOptions,
    once,
    setInViewIfScrolledPast
  )

  const value = {
    isInView,
    domNode,
  }

  const classes = classnames([styles.wrap, isInView && styles.inView, className])

  return (
    <InViewContext.Provider value={value}>
      <Tag ref={setRef} className={classes} {...props} />
    </InViewContext.Provider>
  )
}
