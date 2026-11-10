import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, waitFor, within } from "@storybook/test"
import { useState } from "react"

import { Select } from "./select"
import type { SelectProps } from "./select"
import styles from "./select.stories.module.scss"

const FRUIT = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
]

const meta: Meta<typeof Select> = {
  title: "components/select",
  component: Select,
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "20rem" }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Select>

/**
 * A label above the select. The component has no label of its own, so stories add one.
 */
function Field({
  id,
  label,
  className,
  children,
}: {
  id: string
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={className}
      style={
        className
          ? undefined
          : { display: "inline-flex", flexDirection: "column", gap: "0.5em" }
      }
    >
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}

/**
 * Keeps the select's value in local state and still reports changes to the `onChange` arg.
 */
function useControlled(args: SelectProps, initialValue: string) {
  const [value, setValue] = useState(initialValue)

  return {
    ...args,
    value,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value)
      args.onChange?.(event)
    },
  }
}

export const Default: Story = {
  render: function Render(args) {
    const props = useControlled(args, "banana")

    return (
      <Field id="fruit" label="Fruit">
        <Select {...props} id="fruit">
          {FRUIT.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox", { name: "Fruit" })

    expect(select).toHaveValue("banana")

    await userEvent.selectOptions(select, "cherry")
    await waitFor(() => expect(select).toHaveValue("cherry"))
    expect(args.onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ target: select })
    )
  },
}

/**
 * `<optgroup>` groups options under a heading, and `<hr>` draws a separator in the picker.
 */
export const OptionGroups: Story = {
  render: function Render(args) {
    const props = useControlled(args, "orange")

    return (
      <Field id="fruit-groups" label="Fruit">
        <Select {...props} id="fruit-groups">
          <optgroup label="Citrus">
            <option value="lemon">Lemon</option>
            <option value="lime">Lime</option>
            <option value="orange">Orange</option>
          </optgroup>
          <hr />
          <optgroup label="Berries">
            <option value="blueberry">Blueberry</option>
            <option value="raspberry">Raspberry</option>
            <option value="strawberry">Strawberry</option>
          </optgroup>
        </Select>
      </Field>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox", { name: "Fruit" })
    const groups = select.querySelectorAll("optgroup")

    expect(groups).toHaveLength(2)
    expect(groups[1].label).toBe("Berries")
    expect(
      within(groups[1]).getByRole("option", { name: "Raspberry" })
    ).toBeInTheDocument()

    await userEvent.selectOptions(select, "raspberry")
    await waitFor(() => expect(select).toHaveValue("raspberry"))
  },
}

export const DisabledOptions: Story = {
  render: function Render(args) {
    const props = useControlled(args, "apple")

    return (
      <Field id="fruit-disabled" label="Fruit">
        <Select {...props} id="fruit-disabled">
          <option value="apple">Apple</option>
          <option value="banana" disabled>
            Banana
          </option>
          <option value="cherry" disabled>
            Cherry
          </option>
          <option value="date">Date</option>
        </Select>
      </Field>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByRole("option", { name: "Banana" })).toBeDisabled()
    expect(canvas.getByRole("option", { name: "Cherry" })).toBeDisabled()
    expect(canvas.getByRole("option", { name: "Date" })).toBeEnabled()
  },
}

const COLOURS = [
  { value: "red", label: "Red", hex: "#d32f2f" },
  { value: "green", label: "Green", hex: "#388e3c" },
  { value: "blue", label: "Blue", hex: "#1976d2" },
]

/**
 * Options can only contain text in React, so decoration like colour swatches is drawn
 * with CSS through each option's `className` and `style`. Browsers without customizable
 * select show the text only.
 */
export const StyledOptions: Story = {
  decorators: [
    (Story) => (
      <>
        <style>{`
          .swatch-option::before {
            background-color: var(--swatch);
            border: 1px solid CanvasText;
            content: "";
            display: inline-block;
            height: 1em;
            margin-inline-end: 0.5em;
            vertical-align: middle;
            width: 1em;
          }
        `}</style>
        <Story />
      </>
    ),
  ],
  render: function Render(args) {
    const props = useControlled(args, "green")

    return (
      <Field id="colour" label="Colour">
        <Select {...props} id="colour">
          {COLOURS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="swatch-option"
              style={{ "--swatch": option.hex } as React.CSSProperties}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </Field>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const option = canvas.getByRole("option", { name: "Red" })

    expect(option).toHaveClass("swatch-option")
    expect(option.style.getPropertyValue("--swatch")).toBe("#d32f2f")
  },
}

const GRADIENTS = [
  { value: "sunset", label: "Sunset", from: "#ff5f6d", to: "#ffc371" },
  { value: "aurora", label: "Aurora", from: "#00c9a7", to: "#845ec2" },
  { value: "ocean", label: "Ocean", from: "#2193b0", to: "#6dd5ed" },
  { value: "ember", label: "Ember", from: "#f12711", to: "#f5af19" },
  { value: "orchid", label: "Orchid", from: "#da22ff", to: "#9733ee" },
  { value: "lagoon", label: "Lagoon", from: "#43e97b", to: "#38f9d7" },
]

const gradientStyle = (value: string) => {
  const gradient = GRADIENTS.find((item) => item.value === value) ?? GRADIENTS[0]

  return { "--from": gradient.from, "--to": gradient.to } as React.CSSProperties
}

/**
 * Presentational only: how far `appearance: base-select` can be pushed with the
 * component's custom properties plus your own CSS. The picker becomes a grid of
 * gradient cards that animates in, options stagger in with `sibling-index()`, and
 * the button picks up the selected gradient through custom properties set from
 * state. Browsers without customizable select show the plain native select.
 */
export const Showcase: Story = {
  decorators: [
    (Story) => (
      <div className={styles.stage}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const props = useControlled(args, "aurora")

    return (
      <Field id="gradient" label="Gradient" className={styles.showcase}>
        <Select {...props} id="gradient" style={gradientStyle(props.value)}>
          {GRADIENTS.map(({ value, label, from, to }) => (
            <option
              key={value}
              value={value}
              className={styles.option}
              style={{ "--from": from, "--to": to } as React.CSSProperties}
            >
              {label}
            </option>
          ))}
        </Select>
      </Field>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox", { name: "Gradient" })

    expect(select.style.getPropertyValue("--from")).toBe("#00c9a7")

    await userEvent.selectOptions(select, "ember")
    await waitFor(() => expect(select.style.getPropertyValue("--from")).toBe("#f12711"))
  },
}
