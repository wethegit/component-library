import type { Meta, StoryObj } from "@storybook/react"

import { Row, Column } from "@wethegit/components"

// need to set args manually because of a bug in storybook
// https://github.com/storybookjs/storybook/issues/23418
const meta = {
  title: "components/grid-layout/row",
  component: Row,
  args: {
    as: "div",
    justify: {
      md: "center",
      xl: "space-between",
    },
    align: {
      md: "center",
      xl: "space-between",
    },
    wrap: {
      md: true,
      xl: false,
    },
    reverse: {
      md: false,
      xl: true,
    },
  },
  argTypes: {
    as: {
      control: { type: "text" },
      defaultValue: { summary: "div" },
    },
    justify: {
      control: { type: "object" },
      description:
        "Alignment on the main axis. Accepts a `string` or a `breakpoint-object`.",
      defaultValue: {
        summary: "center",
      },
    },
    align: {
      control: { type: "object" },
      description:
        "Alignment on the cross axis. Accepts a `string` or a `breakpoint-object`.",
      defaultValue: {
        summary: "center",
      },
    },
    wrap: {
      description:
        "Whether or not to wrap children. Accepts a `boolean` or a `breakpoint-object`.",
      control: { type: "object" },
      defaultValue: { summary: true },
    },
    reverse: {
      description:
        "Whether or not to reverse the order of children. Accepts a `boolean` or a `breakpoint-object`.",
      control: { type: "object" },
      defaultValue: { summary: false },
    },
  },
} satisfies Meta<typeof Row>

export default meta

type Story = StoryObj<typeof Row>

/**
 * `align`, `justify`, `reverse` and `wrap` accept a **Breakpoint** prop. Learn more about [Breakpoints](/docs/breakpoints--docs) guide.
 */
export const Default: Story = {
  render: (args) => (
    <Row {...args}>
      <Column span={5}>
        <p>This column spans five columns.</p>
        <p>
          It contains a much longer paragraph. Enim occaecat voluptate proident excepteur
          sint cupidatat exercitation.
        </p>
      </Column>
      <Column span={{ md: 7, xl: 5 }}>
        <p>This column spans 7 columns on medium and large but 5 on xlarge.</p>
      </Column>
    </Row>
  ),
  name: "Row",
}
