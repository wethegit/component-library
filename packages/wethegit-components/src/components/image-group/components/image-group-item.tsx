import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames, fixedForwardRef } from "@local/utilities"

import styles from "./image-group-item.module.scss"

export type ImageGroupItemProps<TAs extends React.ElementType> = TagProps<TAs>

/**
 * Docs about ImageGroupItem coming soon
 */
export const ImageGroupItem = fixedForwardRef(function ImageGroupItem<
  TAs extends React.ElementType = "div",
>({ className, ...props }: ImageGroupItemProps<TAs>, ref: React.ForwardedRef<unknown>) {
  return <Tag className={classnames([styles.item, className])} ref={ref} {...props} />
})
