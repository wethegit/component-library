import { icons } from "../icons"

import styles from "./icon-defs.module.scss"

/**
 * IconDefs
 * Import ONCE in your app and use `Icon` component to render.
 */
export function IconDefs() {
  return (
    <svg className={styles.iconDefs}>
      <defs>
        {Object.entries(icons).map(([id, Symbol]) => (
          <Symbol key={id} />
        ))}
      </defs>
    </svg>
  )
}
