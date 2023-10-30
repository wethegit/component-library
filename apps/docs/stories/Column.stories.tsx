import type { Meta, StoryObj } from "@storybook/react";
import { Row, Column } from "@wethegit/components";

const columnRange = { control: { type: "number", min: 0, max: 12 } };

const meta: Meta<typeof Column> = {
  component: Column,
  argTypes: {
    as: {
      control: { type: "text" },
      description: "The HTMLElement to render.",
    },
    deep: {
      description: "Remove gutter padding. Useful for nested flex-layouts.",
    },
    span: {
      ...columnRange,
      description: "Number of flex-layout columns to span.",
    },
    large: {
      ...columnRange,
      description:
        "Number of flex-layout columns to span at the `large-up` breakpoint.",
    },
    xlarge: {
      ...columnRange,
      description:
        "Number of flex-layout columns to span at the `xlarge-up` breakpoint.",
    },
    xxlarge: {
      ...columnRange,
      description:
        "Number of flex-layout columns to span at the `xxlarge-up` breakpoint.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Column>;

const rowDebugStyle = {
  outline: "1px solid blue",
  boxShadow:
    "rgb(83 198 82 / 34%) -12px 0 0 0 inset, rgb(83 198 82 / 34%) 12px 0 0 0 inset",
};

const columnDebugStyle = {
  backgroundColor: "#eee",
  backgroundClip: "content-box",
  outline: "1px solid hotpink",
  boxShadow:
    "rgb(83 198 82 / 34%) -12px 0 0 0 inset, rgb(83 198 82 / 34%) 12px 0 0 0 inset",
};

export const Default: Story = {
  render: ({ span = 6, ...props }) => (
    <Row>
      <Column span={span} {...props}>
        <p>
          This <code>{"<Column>"}</code> spans {span} grid columns.
        </p>
        <p>
          Qui incididunt ullamco sunt eiusmod et. Do sit incididunt laborum
          laboris. Consequat velit officia magna sit dolore ullamco et
          incididunt. Sunt Lorem excepteur Lorem aliquip fugiat ea dolore
          ullamco. Laboris anim ea enim est magna sint qui. Occaecat ullamco
          mollit nostrud dolore. Fugiat nostrud dolor ipsum aute eiusmod.
        </p>
      </Column>
    </Row>
  ),
  name: "Column",
};

export const GutterVisualizer: Story = {
  render: (props) => (
    <Row style={rowDebugStyle}>
      <Column style={columnDebugStyle} {...props}>
        <span>
          Qui incididunt ullamco sunt eiusmod et. Do sit incididunt laborum
          laboris. Consequat velit officia magna sit dolore ullamco et
          incididunt. Sunt Lorem excepteur Lorem aliquip fugiat ea dolore
          ullamco. Laboris anim ea enim est magna sint qui. Occaecat ullamco
          mollit nostrud dolore. Fugiat nostrud dolor ipsum aute eiusmod.
        </span>
      </Column>
    </Row>
  ),
  name: "Column gutter visualizer",
};
