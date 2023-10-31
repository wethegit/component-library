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

export const Default: Story = {
  render: ({ span = 6, ...args }) => (
    <Row className="outline">
      <Column className="outline" span={span} {...args}>
        <h3>
          {span} column{span !== 1 ? "s" : ""}
        </h3>
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
  render: ({ span = 6, ...args }) => (
    <Row className="gutter-visualizer">
      <Column className="gutter-visualizer" span={span} {...args}>
        <p>
          The left or right padding on a <code>Row</code> or a{" "}
          <code>Column</code> is equivalent to half of a gutter's width, within
          your flex-layout. As shown here, when these components butt-up against
          one another, they form a gap of exactly one gutter's width.
        </p>
        <p>Use the controls to adjust the width of this column.</p>
        <p>
          🚀 Note that the padding still applies at the <code>small</code>{" "}
          breakpoint, despite the lack of a flex-layout there, creating
          "automatic" gutters for your content.
        </p>
      </Column>
      <Column className="gutter-visualizer" span={3}>
        <p>
          This column is set to a fixed span of <code>3</code>.
        </p>
      </Column>
    </Row>
  ),
  name: "Row + Column gutter visualizer",
};
