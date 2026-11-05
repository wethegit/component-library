import { classnames } from "@local/utilities/classnames"
import { Tag } from "@local/components/tag/tag"
import type { TagProps } from "@local/components/tag/tag"

import styles from "./image-group.module.scss"

export type ImageGroupProps<TAs extends React.ElementType> = TagProps<TAs>

export function ImageGroup<TAs extends React.ElementType = "div">({
  className,
  ...props
}: ImageGroupProps<TAs>) {
  return <Tag className={classnames([styles.wrap, className])} {...props} />
}
