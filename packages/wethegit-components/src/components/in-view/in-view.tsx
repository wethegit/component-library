"use client"

import { createContext, ElementType } from "react"
import { useInView } from "@wethegit/react-hooks"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"

export type InViewContextReturn = {
  isInView: boolean
  domNode: HTMLElement | undefined
}

export type InViewProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Percentage of the entry within the viewport for it to be considered in
   * view; a number between 0 and 1. Also accepts an IntersectionObserver options
   * object.
   */
  observerOptions?: number | IntersectionObserverInit
  /**
   * Whether to detach the observer from the DOM element after the first
   * intersection callback is invoked.
   */
  once?: boolean
  /**
   * Whether to consider the element already "in-view", if it is already scrolled
   * beyond the bounds of the viewport when the element is mounted.
   */
  setInViewIfScrolledPast?: boolean
}

export const InViewContext = createContext<InViewContextReturn>({
  isInView: false,
  domNode: undefined,
})

export function InView<TAs extends ElementType, T extends HTMLElement>({
  observerOptions = 0.3,
  once = false,
  setInViewIfScrolledPast = false,
  ...props
}: InViewProps<TAs>) {
  const { as = "div", className, ...rest } = props

  const [setRef, isInView, domNode] = useInView<T>(
    observerOptions,
    once,
    // only honor "setInViewIfScrolledPast" if "once" is true:
    once && setInViewIfScrolledPast ? setInViewIfScrolledPast : false
  )

  const value = {
    isInView,
    domNode,
  }

  return (
    <InViewContext.Provider value={value}>
      <Tag as={as} ref={setRef} className={className} {...rest} />
    </InViewContext.Provider>
  )
}
