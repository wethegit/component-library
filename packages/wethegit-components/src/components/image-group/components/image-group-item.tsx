import { fixedForwardRef } from "@local/utilities/fixed-forward-ref"
import { classnames } from "@local/utilities/classnames"
import { Tag } from "@local/components/tag/tag"
import type { TagProps } from "@local/components/tag/tag"

import styles from "./image-group-item.module.scss"

export type ImageGroupItemProps<TAs extends React.ElementType> = TagProps<TAs>

export const ImageGroupItem = fixedForwardRef(function ImageGroupItem<
  TAs extends React.ElementType = "div",
>({ className, ...props }: ImageGroupItemProps<TAs>, ref: React.ForwardedRef<unknown>) {
  return <Tag className={classnames([styles.item, className])} ref={ref} {...props} />
})
