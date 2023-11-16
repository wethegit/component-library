import type { ElementType, ForwardedRef } from "react"


import styles from "./wrapper.module.scss"

import { Tag } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames, fixedForwardRef } from "@local/utilities"



export const Wrapper = fixedForwardRef(function Wrapper<TAs extends ElementType = "div">(
  { className, ...props }: TagProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const classes = classnames([styles.wrapper, className])

  return <Tag className={classes} ref={ref} {...props} />
})
