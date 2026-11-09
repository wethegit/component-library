"use client"

import { useId } from "react"

import { classnames } from "@local/utilities/classnames"

import styles from "./select.module.scss"

export interface SelectOption<T extends string = string> {
  /**
   * The value passed to `onChange` and submitted with a form.
   */
  value: T
  /**
   * The text shown for this option.
   */
  label: string
  /**
   * Disabled options can't be selected.
   */
  disabled?: boolean
  /**
   * Class name for the `<option>`. Use it with `style` to add decoration such as colour swatches.
   * Options can only contain text, so draw decoration with CSS, e.g. `::before`.
   */
  className?: string
  /**
   * Inline styles for the `<option>`, e.g. a custom property like `{ "--swatch": "red" }`.
   */
  style?: React.CSSProperties
}

export interface SelectProps<T extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "id"> {
  /**
   * The visible label for the select.
   */
  label: React.ReactNode
  /**
   * The list of options.
   */
  options: SelectOption<T>[]
  /**
   * The selected value when controlled, or `null` for no selection.
   */
  value?: T | null
  /**
   * The initial value when uncontrolled, or `null` for no selection.
   * @defaultValue null
   */
  defaultValue?: T | null
  /**
   * Called when the user selects a different option.
   */
  onChange?: (value: T, option: SelectOption<T>) => void
  /**
   * Shown when nothing is selected. It can't be picked again once an option is selected.
   * Pass `null` to leave it out.
   * @defaultValue "Select an option"
   */
  placeholder?: string | null
  /**
   * The select's id. Defaults to one generated with `useId`.
   */
  id?: string
  /**
   * Disables the whole select.
   */
  disabled?: boolean
  /**
   * Props passed to the `<select>`, such as `name`, `required` or `form`.
   */
  selectProps?: Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "id" | "value" | "defaultValue" | "disabled" | "multiple" | "children"
  >
}

/**
 * A native `<select>` with a label. In browsers that support customizable select
 * (`appearance: base-select`), the button and picker can be styled.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
 */
export function Select<T extends string = string>({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  id,
  disabled = false,
  selectProps,
  className,
  ...props
}: SelectProps<T>): React.JSX.Element {
  const generatedId = useId()
  const selectId = id ?? generatedId

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectProps?.onChange?.(event)

    const option = options.find((item) => item.value === event.target.value)
    if (option) onChange?.(option.value, option)
  }

  // `null` maps to the placeholder option's empty value. Without a placeholder,
  // React falls back to the first enabled option.
  const valueProps =
    value !== undefined ? { value: value ?? "" } : { defaultValue: defaultValue ?? "" }

  return (
    <div className={classnames([styles.select, className])} {...props}>
      <label htmlFor={selectId}>{label}</label>
      <select
        {...selectProps}
        {...valueProps}
        id={selectId}
        disabled={disabled}
        className={classnames([styles.control, selectProps?.className])}
        onChange={handleChange}
      >
        {placeholder !== null && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={classnames([styles.option, option.className])}
            style={option.style}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
