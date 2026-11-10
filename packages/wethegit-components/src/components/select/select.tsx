"use client"

import { forwardRef } from "react"

import { classnames } from "@local/utilities/classnames"

import styles from "./select.module.scss"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

/**
 * A native `<select>`. In browsers that support customizable select
 * (`appearance: base-select`), the button and picker are styled. Pass options,
 * groups and every other `<select>` attribute as you would to the native element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, ...props },
  ref
) {
  return (
    <select {...props} ref={ref} className={classnames([styles.control, className])} />
  )
})
