import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames, fixedForwardRef } from "@local/utilities"

import styles from "./image-group.module.scss"

export type ImageGroupProps<TAs extends React.ElementType> = TagProps<TAs>

/**
 * Docs about ImageGroup coming soon
 */
export const ImageGroup = fixedForwardRef(function ImageGroup<
  TAs extends React.ElementType = "div",
>({ className, ...props }: ImageGroupProps<TAs>, ref: React.ForwardedRef<unknown>) {
  return <Tag className={classnames([styles.wrap, className])} ref={ref} {...props} />
})
