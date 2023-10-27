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
  const Tag = as;

  const classes = classNames(
    styles.wrap,
    { [styles[`align-${align}`]]: align },
    { [styles[`justify-${justify}`]]: justify },
    { [styles.noWrap]: noWrap },
    { [styles.reverse]: reverse },
    { [styles.stackMedium]: stackMedium },
    className
  );

  return (
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
}
