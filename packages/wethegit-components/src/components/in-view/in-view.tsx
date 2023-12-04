import { createContext, ElementType } from "react"
import { useInView } from "@wethegit/react-hooks"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"

export type InViewContext = {
  isInView: boolean
  domNode: HTMLElement | undefined
}

export type InViewProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Percentage of the entry within the viewport for it to be considered in
   * view; a number between 0 and 1.
   */
  threshold?: number
  /**
   * Unobserve the entry once it is considered to be in view.
   */
  once?: boolean
  /**
   * Consider the entry "in view" if it is above the viewport. This is most
   * often used for ensuring that content is already animated in, when loading
   * a document from a scroll position _other than_ the top.
   */
  setInViewIfScrolledPast?: boolean
  /**
   * Ensure that the entry remains in view until it fully exits the viewport,
   * regardless of the threshold. Note that this will not have any effect within
   * an `<iframe>`.
   */
  matchRootMarginToThreshold?: boolean
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

  console.log(isInView)

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
