import type { Meta, StoryObj } from "@storybook/react"

import { Icon, IconDefs } from "@local/components"

const meta = {
  title: "components/icon",
  component: Icon,
  args: {
    id: "play",
  },
  decorators: [
    (Story) => (
      <>
        <IconDefs />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  render: (args) => <Icon {...args} />,
}
