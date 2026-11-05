import { VisuallyHidden } from "@local/components/visually-hidden/visually-hidden"
import { classnames } from "@local/utilities/classnames"

import styles from "./toggler.module.scss"

export interface TogglerProps extends React.HTMLAttributes<HTMLButtonElement> {
  open?: boolean
}

export function Toggler({ open = false, className, ...props }: TogglerProps) {
  return (
    <button
      className={classnames([styles.toggler, open && styles.togglerPressed, className])}
      aria-live="polite"
      aria-expanded={open}
      {...props}
    >
      <span className={styles.togglerIcon} />
      <VisuallyHidden>{open ? "Close menu" : "Open menu"}</VisuallyHidden>
    </button>
  )
}
