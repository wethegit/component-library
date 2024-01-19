import styles from "./icon-defs.module.scss"

/**
 * IconDefs
 * Import ONCE in your app and use `Icon` component to render.
 */
export function IconDefs({ children }: { children: React.ReactNode }) {
  return (
    <svg className={styles.iconDefs}>
      <defs>{children}</defs>
    </svg>
  )
}
