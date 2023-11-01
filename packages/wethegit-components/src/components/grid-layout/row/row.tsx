import classNames from "classnames";
import styles from "./row.module.scss";

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
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
  stackMedium?: boolean;
}

/**
 * A container within the component library's grid layout system. Most often used with `<Column>` components as children.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 */
export function Row({
  as = "div",
  align = "center",
  justify = "center",
  noWrap = false,
  reverse = false,
  stackMedium = false,
  className,
  children,
  ...other
}: RowProps): JSX.Element {
  const Tag = as || "div";

  const classes = classNames(
    styles.row,
    { [styles[`align-${align}`]]: align },
    { [styles[`justify-${justify}`]]: justify },
    noWrap && styles.noWrap,
    reverse && styles.reverse,
    stackMedium && styles.stackMedium,
    className
  );

  return (
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
}
