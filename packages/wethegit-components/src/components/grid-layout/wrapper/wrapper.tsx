import type { ElementType } from "react";

import { classnames } from "@local/utilities";
import { Tag } from "@local/components";
import type { TagProps } from "@local/components";

import styles from "./wrapper.module.scss";

/**
 * A container within the component library's grid layout system, which provides padding of one gutter-width on both the left and the right sides.
 */
export function Wrapper<TAs extends ElementType>({
  className,
  ...props
}: TagProps<TAs>): JSX.Element {
  const classes = classnames([styles.wrapper, className]);

  return <Tag className={classes} {...props} />;
}
