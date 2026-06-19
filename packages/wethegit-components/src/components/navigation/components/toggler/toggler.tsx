import { VisuallyHidden } from "@local/components/visually-hidden/visually-hidden"
import { classnames } from "@local/utilities/classnames"
import { fixedForwardRef } from "@local/utilities/fixed-forward-ref"

import styles from "./toggler.module.scss"

export interface TogglerProps extends React.HTMLAttributes<HTMLButtonElement> {
  open?: boolean
}

export const Toggler = fixedForwardRef<HTMLButtonElement, TogglerProps>(function Toggler(
  { open = false, className, ...props }: TogglerProps,
  ref
) {
  return (
    <button
      className={classnames([styles.toggler, open && styles.togglerPressed, className])}
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
