"use client"

import { classnames } from "@local/utilities"

import { useReducedMotion } from "../hooks"

import styles from "./reduced-motion-button.module.scss"

export interface ReducedMotionButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

/**
 * A button that toggles the user preference for reduced motion.
 */
export function ReducedMotionButton(props: ReducedMotionButtonProps) {
  const { prefersReducedMotion, togglePrefersReducedMotion } = useReducedMotion()

  const handleClick = () => {
    togglePrefersReducedMotion()
  }

  return (
    <button
      className={classnames([
        styles.rmButton,
        castToBool(prefersReducedMotion) && styles.rmButtonSelected,
      ])}
      onClick={handleClick}
      aria-pressed={prefersReducedMotion}
      {...props}
    >
      <span className={styles.rmButtonIcon} />
      <span className={styles.rmButtonLabel}>Reduced motion</span>
    </button>
  )
}

export function castToBool(input: boolean | string) {
  if (typeof input === "boolean") return input
  return input === "true" ? true : false
}
