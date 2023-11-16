import type { Meta, StoryObj } from "@storybook/react"

import { Row, Column } from "@local/components"
import type { ColumnBreakpoints } from "@local/components"

const DEFAULT_SPAN: ColumnBreakpoints = { md: 4, lg: 8 }

const meta = {
  title: "components/grid-layout/column",
  component: Column,
  args: {
    as: "div",
    span: DEFAULT_SPAN,
  },
  argTypes: {
    as: {
      defaultValue: { summary: "div" },
    },
  },
} satisfies Meta<typeof Column>

export default meta

type Story = StoryObj<typeof Column>

function plural(span: number): string {
  return span !== 1 ? "s" : ""
}

function howManyColumns(
  span?: ColumnBreakpoints | number
): JSX.Element | null | JSX.Element[] {
  if (!span) return null

  if (typeof span === "number")
    return (
      <h3>
        {span} column{plural(span)}
      </h3>
    )

  return Object.entries(span).map(([key, val]) => (
    <p key={key}>{`${val} column${plural(val)} on '${key}' breakpoint`}</p>
  ))
}

export const Default: Story = {
  render: ({ span, ...args }) => (
    <Row>
      <Column span={span} {...args}>
        {howManyColumns(span)}
        <p>
          Qui incididunt ullamco sunt eiusmod et. Do sit incididunt laborum laboris.
          Consequat velit officia magna sit dolore ullamco et incididunt. Sunt Lorem
          excepteur Lorem aliquip fugiat ea dolore ullamco. Laboris anim ea enim est magna
          sint qui. Occaecat ullamco mollit nostrud dolore. Fugiat nostrud dolor ipsum
          aute eiusmod.
        </p>
      </Column>
      <Column as="p">
        This column renders as a <code>p</code> tag and doesn't have a fixed span, so it
        will fill the available space.
      </Column>
    </Row>
  ),
}

export const GutterVisualizer: Story = {
  name: "Gutter visualizer",
  render: (args) => (
    <Row className="gutter-visualizer">
      <Column className="gutter-visualizer">
        <p>
          The left or right padding on a <code>Row</code> or a <code>Column</code> is
          equivalent to half of a gutter's width, within your flex-layout. As shown here,
          when these components butt-up against one another, they form a gap of exactly
          one gutter's width.
        </p>
        <p>Use the controls to adjust the width of this column.</p>
        <p>
          🚀 Note that the padding still applies at the <code>small</code> breakpoint,
          despite the lack of a flex-layout there, creating "automatic" gutters for your
          content.
        </p>
      </Column>
      <Column className="gutter-visualizer" {...args}>
        {howManyColumns(args.span)}
      </Column>
    </Row>
  ),
}

export const NestedColumns: Story = {
  name: "Nested columns",
  render: (args) => (
    <Row className="gutter-visualizer">
      <Column className="gutter-visualizer" {...args}>
        <p>
          Nesting columns is easy. Just add another <code>Row</code>, more{" "}
          <code>Column</code> components and don't forget to set the <code>deep</code>{" "}
          prop on the nested <code>Column</code> components.
        </p>
        {howManyColumns(args.span)}
      </Column>
      <Column className="gutter-visualizer" span={7}>
        <p>
          This spans <code>7</code> columns
        </p>
        <Row className="gutter-visualizer">
          <Column className="gutter-visualizer" deep>
            <p>
              Notice how the text touches the edge and they don't have an internal
              padding.
            </p>
          </Column>
          <Column className="gutter-visualizer" deep>
            <p>
              Notice how the text touches the edge and they don't have an internal
              padding.
            </p>
          </Column>
        </Row>
      </Column>
    </Row>
  ),
}
