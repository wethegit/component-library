import { useContext } from "react"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { InViewContext } from "@local/components/in-view"
import { classnames, fixedForwardRef } from "@local/utilities"

import styles from "./in-view-item.module.scss"

export type InViewItemProps<TAs extends React.ElementType> = TagProps<TAs> & {
  animation?: boolean
}

export const InViewItem = fixedForwardRef(function InViewItem<
  TAs extends React.ElementType,
>({ className, ...props }: InViewItemProps<TAs>, ref: React.ForwardedRef<unknown>) {
  const context = useContext(InViewContext)
  if (!context) throw new Error("<InViewItem> must be a descendent of <InView>.")

  const classes = classnames([styles.wrap, context.isInView && styles.inView, className])

  return <Tag ref={ref} className={classes} {...props} />
})
