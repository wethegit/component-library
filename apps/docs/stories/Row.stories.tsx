import type { Meta, StoryObj } from "@storybook/react";
import { Row } from "@wethegit/components";

const meta: Meta<typeof Row> = {
  component: Row,
  argTypes: {
    as: {
      control: { type: "text" },
    },
    align: {
      control: { type: "select" },
    },
    justify: {
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Row>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (props) => <Row {...props} />,
  name: "Row",
};
