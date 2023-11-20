import { VisuallyHidden } from "@local/components"
import { classnames, fixedForwardRef } from "@local/utilities"

import styles from "./toggler.module.scss"

export interface TogglerProps extends React.HTMLAttributes<HTMLButtonElement> {
  open?: boolean
}

export const Toggler = fixedForwardRef<HTMLButtonElement, TogglerProps>(function Toggler(
  { open = false, ...props }: TogglerProps,
  ref
) {
  return (
    <button
      className={classnames([styles.toggler, open && styles.togglerPressed])}
      aria-live="polite"
      aria-expanded={open}
      ref={ref}
      {...props}
    >
      <span className={styles.togglerIcon} />
      <VisuallyHidden>{open ? "Close menu" : "Open menu"}</VisuallyHidden>
    </button>
  )
})
