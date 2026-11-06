"use client"

import { useUserPrefs } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities/classnames"

import styles from "./reduced-motion-toggle.module.scss"

export type ReducedMotionToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function ReducedMotionToggle({
  children = "Reduced motion",
  className,
  onClick,
  ...props
}: ReducedMotionToggleProps): React.JSX.Element {
  const { prefersReducedMotion, setPrefersReducedMotion } = useUserPrefs()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(event)
    setPrefersReducedMotion(!prefersReducedMotion)
  }

  return (
    <button
      {...props}
      type="button"
      role="switch"
      aria-checked={!!prefersReducedMotion}
      className={classnames([styles.toggle, className])}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
