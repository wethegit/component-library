import { classnames } from "@local/utilities"

import styles from "./overlay.module.scss"

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
}

export function Overlay({ open = false, ...props }: OverlayProps) {
  return (
    <div
      className={classnames([styles.overlay, open && styles.overlayOpen])}
      {...props}
    />
  )
}
