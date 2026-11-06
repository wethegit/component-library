"use client"

import { useUserPrefs } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities/classnames"

import styles from "./reduced-motion-toggle.module.scss"

export type ReducedMotionToggleProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "defaultChecked"
>

export function ReducedMotionToggle({
  children = "Reduced motion",
  className,
  onChange,
  ...props
}: ReducedMotionToggleProps): React.JSX.Element {
  const { prefersReducedMotion, setPrefersReducedMotion } = useUserPrefs()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setPrefersReducedMotion(event.target.checked)
  }

  return (
    <label className={classnames([styles.toggle, className])}>
      <input
        {...props}
        type="checkbox"
        checked={!!prefersReducedMotion}
        onChange={handleChange}
      />
      {children}
    </label>
  )
}
