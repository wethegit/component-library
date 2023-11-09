import type { ElementType, ForwardedRef } from "react";

import { classnames, fixedForwardRef } from "@local/utilities";
import type { TagProps } from "@local/components";
import { Tag } from "@local/components";

import styles from "./row.module.scss";

export type RowProps<TAs extends ElementType> = TagProps<TAs> & {
  align?: "flex-start" | "center" | "flex-end" | "baseline" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  noWrap?: boolean;
  reverse?: boolean;
  stackMedium?: boolean;
};

export function UnwrappedRow<TAs extends React.ElementType>(
  {
    align = "center",
    justify = "center",
    noWrap = false,
    reverse = false,
    stackMedium = false,
    className,
    ...props
  }: RowProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const classes = classnames([
    styles.row,
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    noWrap && styles.noWrap,
    reverse && styles.reverse,
    stackMedium && styles.stackMedium,
    className,
  ]);

  return <Tag ref={ref} className={classes} {...props} />;
}

/**
 * A container within the component library's grid layout system. Most often used with `<Column>` components as children.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 */
export const Row = fixedForwardRef(UnwrappedRow);
