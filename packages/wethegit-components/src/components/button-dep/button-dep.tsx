import classNames from "classnames";
import styles from "./button-dep.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ButtonDep({ children }: ButtonProps): JSX.Element {
  return <div className={classNames(styles.ButtonDep)}>{children}</div>;
}
