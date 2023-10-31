import classNames from "classnames";
import styles from "./wrapper.module.scss";

export interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

/**
 * A container within the component library's layout system, which provides padding of one gutter-width on both the left and the right sides.
 */
export function Wrapper({
  as = "div",
  className,
  children,
  ...other
}: WrapperProps): JSX.Element {
  const Tag = as || "div";

  const classes = classNames(styles.wrapper, className);

  return (
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
}
