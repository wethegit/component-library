import type { Meta, StoryObj } from "@storybook/react"

import { Row, Column } from "@wethegit/components"

const meta = {
  title: "components/grid-layout/row",
  component: Row,
  args: {
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
} satisfies Meta<typeof Row>

export default meta

type Story = StoryObj<typeof Row>

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
}
