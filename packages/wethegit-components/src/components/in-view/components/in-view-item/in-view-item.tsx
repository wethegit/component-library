import { useContext, useMemo } from "react"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { InViewContext } from "@local/components/in-view"
import {
  composeAnimateClassnames,
  composeStaggerClassnames,
} from "@local/components/in-view/utilities"
import type { InViewProps } from "@local/components/in-view"
import styles from "@local/components/in-view/in-view.module.scss"
import { classnames, fixedForwardRef } from "@local/utilities"

export type InViewItemProps<TAs extends React.ElementType> = TagProps<TAs> &
  Pick<InViewProps<TAs>, "animation" | "delay" | "duration" | "staggerChildren">

export const InViewItem = fixedForwardRef(function InViewItem<
  TAs extends React.ElementType,
>(
  { animation, delay, duration, staggerChildren, ...props }: InViewItemProps<TAs>,
  ref: React.ForwardedRef<unknown>
) {
  const context = useContext(InViewContext)
  if (!context) throw new Error("<InViewItem> must be a descendent of <InView>.")

  const { as = "div", className, ...rest } = props

  const baseClasses = context.isInView && styles.inView

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

  return <Tag as={as} ref={ref} className={mergedClasses} {...rest} />
})
