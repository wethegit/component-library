import classNames from "classnames";
import { fixedForwardRef } from "@local/utilities";
import { Tag } from "@local/components";
import type { TagProps } from "@local/components";
import styles from "./column.module.scss";

export type ColumnProps<TAs extends React.ElementType> = TagProps<TAs> & {
  as?: React.ElementType;
  deep?: boolean;
  span?: number;
  large?: number;
  xlarge?: number;
  xxlarge?: number;
};

function UnwrappedColumn<TAs extends React.ElementType = "div">(
  {
    deep = false,
    span,
    large,
    xlarge,
    xxlarge,
    className,
    children,
    ...rest
  }: ColumnProps<TAs>,
  ref: React.ForwardedRef<unknown>
): JSX.Element {
  const { as = "div", ...props } = rest;

  const classes = classNames(
    styles.column,
    deep && styles.deep,
    span && styles[`span-${span}`],
    large && styles[`span-large-${large}`],
    xlarge && styles[`span-xlarge-${xlarge}`],
    xxlarge && styles[`span-xxlarge-${xxlarge}`],
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
