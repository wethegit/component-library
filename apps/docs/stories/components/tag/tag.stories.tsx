import type { Meta, StoryObj } from "@storybook/react"

import { Tag } from "@wethegit/components"

const meta: Meta<typeof Tag> = {
  title: "components/tag",
  component: Tag,
  argTypes: {
    as: {
      control: { type: "text" },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  render: (args) => (
    <Tag as="p" {...args}>
      <span>
        This <code>&lt;Tag /&gt;</code> component is rendering a <code>&lt;p /&gt;</code>{" "}
        tag.
      </span>
    </Tag>
  ),
  name: "Tag",
}
