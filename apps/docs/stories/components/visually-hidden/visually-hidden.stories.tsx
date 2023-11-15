import type { Meta, StoryObj } from "@storybook/react"
import { VisuallyHidden } from "@wethegit/components"

const meta: Meta<typeof VisuallyHidden> = {
  title: "components/visually-hidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  args: {
    as: "span",
  },
  argTypes: {
    as: {
      control: { type: "text" },
      description: "HTML tag name to render.",
      defaultValue: { summary: "span" },
    },
    revealOnFocus: {
      control: { type: "boolean" },
      description:
        "Only show the content when it's active or focused. Hidden content must be focusable for this to work.",
      defaultValue: { summary: false },
    },
  },
} satisfies Meta<typeof VisuallyHidden>

export default meta

type Story = StoryObj<typeof VisuallyHidden>

export const Default: Story = {
  name: "VisuallyHidden",
  render: (args) => (
    <>
      <p>The following link contains visually-hidden text after the visible text.</p>
      <a href="#">
        Learn more <VisuallyHidden {...args}>about the game.</VisuallyHidden>
      </a>
    </>
  ),
}

export const RevealOnFocus: Story = {
  name: "Reveal on focus",
  render: ({ revealOnFocus = true, ...args }) => (
    <>
      <p>
        The following link is invisible unless focused on. Try using the`tab` key on your
        keyboard within this frame.
      </p>
      <VisuallyHidden as="a" revealOnFocus href="#">
        Skip to main content
      </VisuallyHidden>
    </>
  ),
}
