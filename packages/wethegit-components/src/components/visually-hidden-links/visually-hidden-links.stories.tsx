import type { Meta, StoryObj } from "@storybook/react"

import { VisuallyHiddenLinks } from "@local/components"

const meta: Meta<typeof VisuallyHiddenLinks> = {
  title: "components/visually-hidden-links",
  component: VisuallyHiddenLinks,
} satisfies Meta<typeof VisuallyHiddenLinks>

export default meta

type Story = StoryObj<typeof VisuallyHiddenLinks>

export const Default: Story = {
  render: (args) => (
    <VisuallyHiddenLinks
      {...args}
      items={[
        {
          label: "This is my little link one",
          href: "#link-one",
        },
        {
          label: "This is my little link two",
          href: "#link-two",
        },
        {
          label: "This is my little link three",
          href: "#link-three",
        },
      ]}
    />
  ),
}
