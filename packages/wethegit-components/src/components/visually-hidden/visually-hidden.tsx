import type { ElementType } from "react"
import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames } from "@local/utilities"

import styles from "./visually-hidden.module.scss"

const DEFAULT_ELEMENT = "span"

export type VisuallyHiddenProps<TAs extends ElementType> = TagProps<TAs> & {
  revealOnFocus?: boolean
}

export function VisuallyHidden<TAs extends ElementType = typeof DEFAULT_ELEMENT>({
  revealOnFocus = false,
  className,
  ...props
}: VisuallyHiddenProps<TAs>): JSX.Element {
  const { as = DEFAULT_ELEMENT, ...rest } = props
  const classes = revealOnFocus ? styles["reveal-on-focus"] : styles.standard

  return <Tag {...rest} as={as} className={classnames([classes, className])} />
}
