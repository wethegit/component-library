import classNames from "classnames";
import styles from "./column.module.scss";

export interface ColumnProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  deep?: boolean;
  span?: number;
  large?: number;
  xlarge?: number;
  xxlarge?: number;
}

/**
 * Spans the specified number of columns within the component library's grid layout system. Intended to be used as a child of the `<Row>` component. Supports mobile-first, breakpoint-specific settings.
 *
 * The grid layout system does not apply to the `small` breakpoint.
 */
export function Column({
  as = "div",
  deep = false,
  span,
  large,
  xlarge,
  xxlarge,
  className,
  children,
  ...other
}: ColumnProps): JSX.Element {
  const Tag = as || "div";

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
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
}
