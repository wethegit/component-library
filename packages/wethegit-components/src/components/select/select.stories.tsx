import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, userEvent, waitFor, within } from "@storybook/test"
import { useState } from "react"

import { Select } from "./select"
import type { SelectOption } from "./select"
import styles from "./select.stories.module.scss"

const FRUIT: SelectOption[] = [
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
    label: "Fruit",
    options: FRUIT,
    value: "banana",
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "20rem" }}>
        <Story />
      </div>
    ),
  ],
  // Most stories are controlled, so keep the selected value in local state
  render: function Render(args) {
    const [value, setValue] = useState(args.value)

    return (
      <Select
        {...args}
        value={value}
        onChange={(newValue, option) => {
          setValue(newValue)
          args.onChange?.(newValue, option)
        }}
      />
    )
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox", { name: "Fruit" })

    expect(select).toHaveValue("banana")

    await userEvent.selectOptions(select, "cherry")
    await waitFor(() => expect(select).toHaveValue("cherry"))
    expect(args.onChange).toHaveBeenLastCalledWith("cherry", FRUIT[2])
  },
}

export const WithPlaceholder: Story = {
  args: {
    value: null,
    placeholder: "Pick a fruit",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole<HTMLSelectElement>("combobox", { name: "Fruit" })

    expect(select).toHaveValue("")
    expect(select.selectedOptions[0]).toHaveTextContent("Pick a fruit")
    expect(select.selectedOptions[0]).toBeDisabled()

    await userEvent.selectOptions(select, "apple")
    await waitFor(() => expect(select).toHaveValue("apple"))
    expect(args.onChange).toHaveBeenLastCalledWith("apple", FRUIT[0])
  },
}

export const DisabledOptions: Story = {
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "cherry", label: "Cherry", disabled: true },
      { value: "date", label: "Date" },
    ],
    value: "apple",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByRole("option", { name: "Banana" })).toBeDisabled()
    expect(canvas.getByRole("option", { name: "Cherry" })).toBeDisabled()
    expect(canvas.getByRole("option", { name: "Date" })).toBeEnabled()
  },
}

const COLOURS: SelectOption[] = [
  { value: "red", label: "Red", hex: "#d32f2f" },
  { value: "green", label: "Green", hex: "#388e3c" },
  { value: "blue", label: "Blue", hex: "#1976d2" },
].map(({ hex, ...option }) => ({
  ...option,
  className: "swatch-option",
  style: { "--swatch": hex } as React.CSSProperties,
}))

/**
 * Options can only contain text, so decoration like colour swatches is drawn with CSS
 * through each option's `className` and `style`. Browsers without customizable select
 * show the text only.
 */
export const StyledOptions: Story = {
  args: {
    label: "Colour",
    options: COLOURS,
    value: "green",
  },
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

const GRADIENT_OPTIONS: SelectOption[] = GRADIENTS.map(({ from, to, ...option }) => ({
  ...option,
  className: styles.option,
  style: { "--from": from, "--to": to } as React.CSSProperties,
}))

const gradientStyle = (value?: string | null) => {
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
  args: {
    label: "Gradient",
    options: GRADIENT_OPTIONS,
    value: "aurora",
    placeholder: null,
  },
  decorators: [
    (Story) => (
      <div className={styles.stage}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [value, setValue] = useState(args.value)

    return (
      <Select
        {...args}
        value={value}
        className={styles.showcase}
        selectProps={{ style: gradientStyle(value) }}
        onChange={(newValue, option) => {
          setValue(newValue)
          args.onChange?.(newValue, option)
        }}
      />
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox", { name: "Gradient" })

    expect(select.style.getPropertyValue("--from")).toBe("#00c9a7")

    await userEvent.selectOptions(select, "ember")
    await waitFor(() => expect(select.style.getPropertyValue("--from")).toBe("#f12711"))
    expect(args.onChange).toHaveBeenLastCalledWith("ember", GRADIENT_OPTIONS[3])
  },
}
