import classNames from "classnames";

import { fixedForwardRef } from "@local/utilities";
import { Tag } from "@local/components";
import type { TagProps } from "@local/components";

import styles from "./column.module.scss";

export type ColumnProps<TAs extends React.ElementType> = TagProps<TAs> & {
  as?: React.ElementType;
  deep?: boolean;
  span?: Record<Exclude<Breakpoint, "sm">, number> | number;
};

function UnwrappedColumn<TAs extends React.ElementType = "div">(
  { deep = false, span, className, children, ...rest }: ColumnProps<TAs>,
  ref: React.ForwardedRef<unknown>
): JSX.Element {
  const { as = "div", ...props } = rest;

  // build classnames from span prop
  let breakpointClassNames: string[] = [];
  if (typeof span === "number") {
    breakpointClassNames.push(styles[`span-${span}`]);
  } else if (typeof span === "object") {
    const { md, lg, xl, xxl } = span;

    if (md) breakpointClassNames.push(styles[`span-${md}`]);
    if (lg) breakpointClassNames.push(styles[`span-large-${lg}`]);
    if (xl) breakpointClassNames.push(styles[`span-xlarge-${xl}`]);
    if (xxl) breakpointClassNames.push(styles[`span-xlarge-${xxl}`]);
  }

  const classes = classNames(
    styles.column,
    deep && styles.deep,
    breakpointClassNames,
    className
  );

  return (
    <Tag className={classes} ref={ref} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component. Supports mobile-first, breakpoint-specific settings.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 */
export const Column = fixedForwardRef(UnwrappedColumn);
