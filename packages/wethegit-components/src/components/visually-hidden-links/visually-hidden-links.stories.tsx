import type { Meta, StoryObj } from "@storybook/react"

import { VisuallyHiddenLinks } from "@local/components"

const DEFAULT_AS = "ul"

const meta: Meta<typeof VisuallyHiddenLinks> = {
  title: "components/visually-hidden-links",
  component: VisuallyHiddenLinks,
  args: {
    as: DEFAULT_AS,
    items: [
      {
        label: "Skip to main navigation",
        href: "#main-navigation",
      },
      {
        label: "Skip to content",
        href: "#main-content",
      },
      {
        label: "Skip to footer",
        href: "#footer",
      },
    ],
  },
  argTypes: {
    as: {
      defaultValue: { summary: DEFAULT_AS },
    },
  },
} satisfies Meta<typeof VisuallyHiddenLinks>

export default meta

type Story = StoryObj<typeof VisuallyHiddenLinks>

export const Default: Story = {
  render: (args) => (
    <>
      <p>TODO: Explain why nothing is shown here, and what to do</p>
      <VisuallyHiddenLinks {...args} />
    </>
  ),
}
