import type { ElementType, ForwardedRef } from "react";

import { classnames } from "@local/utilities";
import type { ClassnamesProps } from "@local/utilities";
import { fixedForwardRef } from "@local/utilities";
import { Tag } from "@local/components";
import type { TagProps } from "@local/components";

import styles from "./column.module.scss";

export type ColumnProps<TAs extends ElementType> = TagProps<TAs> & {
  deep?: boolean;
  span?: Omit<Breakpoints<number>, "sm">;
};

function UnwrappedColumn<TAs extends ElementType>(
  { deep = false, span, className, ...props }: ColumnProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  // build classnames from span prop
  let breakpointClassNames: ClassnamesProps = [];

  if (typeof span === "number") {
    breakpointClassNames.push(styles[`span-${span}`]);
  } else if (typeof span === "object") {
    const { md, lg, xl, xxl } = span;

    if (md) breakpointClassNames.push(styles[`span-${md}`]);
    if (lg) breakpointClassNames.push(styles[`span-large-${lg}`]);
    if (xl) breakpointClassNames.push(styles[`span-xlarge-${xl}`]);
    if (xxl) breakpointClassNames.push(styles[`span-xlarge-${xxl}`]);
  }

  const classes = classnames([
    styles.column,
    deep && styles.deep,
    breakpointClassNames,
    className,
  ]);

  return <Tag className={classes} ref={ref} {...props} />;
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component. Supports mobile-first, breakpoint-specific settings.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 */
export const Column = fixedForwardRef(UnwrappedColumn);
