"use client"

import { useUserPrefs } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities/classnames"

import styles from "./reduced-motion-toggle.module.scss"

interface ReducedMotionToggleProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  checkboxProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "defaultChecked"
  >
}

export function ReducedMotionToggle({
  children = "Reduced motion",
  className,
  checkboxProps,
  ...props
}: ReducedMotionToggleProps): React.JSX.Element {
  const { prefersReducedMotion, setPrefersReducedMotion } = useUserPrefs()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkboxProps?.onChange?.(event)
    setPrefersReducedMotion(event.target.checked)
  }

  return (
    <label className={classnames([styles.toggle, className])} {...props}>
      <input
        {...checkboxProps}
        type="checkbox"
        checked={!!prefersReducedMotion}
        onChange={handleChange}
      />
      {children}
    </label>
  )
}
