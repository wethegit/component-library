import type { Meta, StoryObj } from "@storybook/react"

import { VisuallyHidden } from "@local/components"

const meta: Meta<typeof VisuallyHidden> = {
  title: "components/visually-hidden",
  component: VisuallyHidden,
  args: {
    as: "span",
  },
  argTypes: {
    as: {
      defaultValue: { summary: "span" },
    },
  },
} satisfies Meta<typeof VisuallyHidden>

export default meta

type Story = StoryObj<typeof VisuallyHidden>

export const Default: Story = {
  render: (args) => (
    <>
      <p>The following link contains visually-hidden text after the visible text.</p>
      <a href="#id">
        Learn more <VisuallyHidden {...args}>about the game.</VisuallyHidden>
      </a>
    </>
  ),
}

export const RevealOnFocus: Story = {
  name: "Reveal on focus",
  render: () => (
    <>
      <p>
        The following link is invisible unless focused on. Try using the`tab` key on your
        keyboard within this frame.
      </p>
      <VisuallyHidden as="a" href="#main-content" revealOnFocus>
        Skip to main content
      </VisuallyHidden>
    </>
  ),
}
