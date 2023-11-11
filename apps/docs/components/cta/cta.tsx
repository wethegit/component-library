import styles from "./cta.module.scss"

export function Cta(props: React.PropsWithChildren<{}>) {
  return <div className={styles.cta} {...props} />
}
