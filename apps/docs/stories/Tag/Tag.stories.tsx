import type { Meta, StoryObj } from "@storybook/react";
import { Row, Tag } from "@wethegit/components";

const meta: Meta<typeof Tag> = {
  component: Tag,
  argTypes: {
    as: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: (args) => (
    <Tag as={Row} {...args}>
      This <code>&lt;Tag /&gt;</code> component is rendering a{" "}
      <code>&lt;Row /&gt;</code> component.
    </Tag>
  ),
  name: "Tag",
};
