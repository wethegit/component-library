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

export const NestedColumns: Story = {
  name: "Nested columns",
  render: (args) => (
    <Row className="gutterVisualizer">
      <Column className="gutterVisualizer" {...args}>
        <p>
          Nesting columns is easy. Just add another <code>Row</code>, more{" "}
          <code>Column</code> components and don't forget to set the <code>deep</code>{" "}
          prop on the nested <code>Column</code> components.
        </p>
        {howManyColumns(args.span)}
      </Column>
      <Column className="gutterVisualizer" span={7}>
        <p>
          This spans <code>7</code> columns
        </p>
        <Row className="gutterVisualizer">
          <Column className="gutterVisualizer" deep>
            <p>
              Notice how the text touches the edge and they don't have an internal
              left/right gutter.
            </p>
          </Column>
          <Column className="gutterVisualizer" deep>
            <p>
              Notice how the text touches the edge and they don't have an internal
              left/right gutter.
            </p>
          </Column>
        </Row>
      </Column>
    </Row>
  ),
}
