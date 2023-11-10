import type { ElementType, ForwardedRef } from "react"

import { classnames, fixedForwardRef } from "@local/utilities"

import { Tag } from "../../tag"
import type { TagProps } from "../../tag"

import styles from "./wrapper.module.scss"

export function UnwrappedWrapper<TAs extends ElementType = "div">(
  { className, ...props }: TagProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const classes = classnames([styles.wrapper, className])

  return <Tag ref={ref} className={classes} {...props} />
}

/**
 * A container within the component library's grid layout system, which provides padding of one gutter-width on both the left and the right sides.
 */
export const Wrapper = fixedForwardRef(UnwrappedWrapper)
