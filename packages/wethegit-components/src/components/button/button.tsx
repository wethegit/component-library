import { ButtonDep } from "../button-dep";
import styles from "./button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps): JSX.Element {
  return (
    <ButtonDep>
      <button className={styles.Button} type="button" {...other}>
        {children}
      </button>
    </ButtonDep>
  );
}
