import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@wethegit/components";

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
    <Tag {...args}>
      Tempor anim duis velit ut ea occaecat ullamco tempor elit elit ullamco id
      pariatur quis. Laboris incididunt aute ipsum pariatur. Et sit non et irure
      laboris reprehenderit cupidatat aliqua. Ipsum ex aliqua magna commodo sint
      sunt. Velit ad officia cupidatat ipsum. Ex nulla exercitation aliqua irure
      sint ex sunt. Elit est sint ut tempor id sit dolore amet elit. Deserunt
      esse sint elit nulla tempor. Laboris non laboris magna nulla incididunt id
      est esse.
    </Tag>
  ),
  name: "Tag",
};
