import { ElementType } from "react"

import { Tag } from "@local/components/tag"
import type { TagProps } from "@local/components/tag"
import { classnames } from "@local/utilities"

import styles from "./visually-hidden.module.scss"

export type VisuallyHiddenProps<TAs extends ElementType> = TagProps<TAs> & {
  revealOnFocus?: boolean
}

export function VisuallyHidden<TAs extends ElementType = "span">({
  revealOnFocus = false,
  className,
  ...props
}: VisuallyHiddenProps<TAs>) {
  const classes = revealOnFocus ? styles["reveal-on-focus"] : styles["standard"]

  return <Tag className={classnames([classes, className])} {...props} />
}
