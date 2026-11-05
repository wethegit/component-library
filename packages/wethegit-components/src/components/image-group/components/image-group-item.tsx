import { classnames } from "@local/utilities/classnames"
import { Tag } from "@local/components/tag/tag"
import type { TagProps } from "@local/components/tag/tag"

import styles from "./image-group-item.module.scss"

export type ImageGroupItemProps<TAs extends React.ElementType> = TagProps<TAs>

export function ImageGroupItem<TAs extends React.ElementType = "div">({
  className,
  ...props
}: ImageGroupItemProps<TAs>) {
  return <Tag className={classnames([styles.item, className])} {...props} />
}
