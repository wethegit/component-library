import { classnames, fixedForwardRef } from "@local/utilities";
import { Tag } from "@local/components";
import type { TagProps } from "@local/components";
import styles from "./column.module.scss";

export type FlexProps<TAs extends React.ElementType> = TagProps<TAs> & {
  as?: React.ElementType;
  align?: "flex-start" | "center" | "flex-end" | "baseline" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  noWrap?: boolean;
  reverse?: boolean;
};

function UnwrappedFlex<TAs extends React.ElementType = "div">(
  {
    align = "center",
    justify = "center",
    noWrap = false,
    reverse = false,
    className,
    children,
    ...rest
  }: FlexProps<TAs>,
  ref: React.ForwardedRef<unknown>
): JSX.Element {
  const { as = "div", ...props } = rest;

  const classes = classnames([
    styles.flex,
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    noWrap && styles.noWrap,
    reverse && styles.reverse,
    className,
  ]);

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
export const Flex = fixedForwardRef(UnwrappedFlex);
