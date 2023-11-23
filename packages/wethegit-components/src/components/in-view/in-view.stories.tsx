import type { Meta, StoryObj } from "@storybook/react"

import { InView, InViewItem } from "."

const meta: Meta<typeof InView> = {
  title: "components/in-view",
  component: InView,
}

export default meta

type Story = StoryObj<typeof InView>

export const Default: Story = {
  render: (args) => (
    <InView {...args}>
      <InViewItem test>Item 1</InViewItem>
      <InViewItem test>Item 2</InViewItem>
      <InViewItem test>Item 3</InViewItem>
    </InView>
  ),
}
