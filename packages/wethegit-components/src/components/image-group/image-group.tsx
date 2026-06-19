import { classnames } from "@local/utilities/classnames"
import { fixedForwardRef } from "@local/utilities/fixed-forward-ref"
import { Tag } from "@local/components/tag/tag"
import type { TagProps } from "@local/components/tag/tag"

import styles from "./image-group.module.scss"

export type ImageGroupProps<TAs extends React.ElementType> = TagProps<TAs>

export const ImageGroup = fixedForwardRef(function ImageGroup<
  TAs extends React.ElementType = "div",
>({ className, ...props }: ImageGroupProps<TAs>, ref: React.ForwardedRef<unknown>) {
  return <Tag className={classnames([styles.wrap, className])} ref={ref} {...props} />
})
