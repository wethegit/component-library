import type { ElementType, ForwardedRef, JSX } from "react"

import { Tag } from "@local/components/tag/tag"
import type { TagProps } from "@local/components/tag/tag"
import { classnames } from "@local/utilities/classnames"
import { fixedForwardRef } from "@local/utilities/fixed-forward-ref"

import styles from "./wrapper.module.scss"

export const Wrapper = fixedForwardRef(function Wrapper<TAs extends ElementType = "div">(
  { className, ...props }: TagProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const classes = classnames([styles.wrapper, className])

  return <Tag className={classes} ref={ref} {...props} />
})
