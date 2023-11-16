import type { Meta, StoryObj } from "@storybook/react"

import { Tag } from "@wethegit/components"

const meta: Meta<typeof Tag> = {
  title: "components/tag",
  component: Tag,
  args: {
    as: "p"
  },
  argTypes: {
    as: {
      defaultValue: { summary: "div" },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  render: (args) => (
    <Tag {...args}>
      <span>
        This <code>&lt;Tag /&gt;</code> component is rendering a <code>&lt;p /&gt;</code>{" "}
        tag.
      </span>
    </Tag>
  ),
  name: "Tag",
}
