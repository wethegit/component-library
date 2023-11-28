import type { Meta, StoryObj } from "@storybook/react"

import { InView, InViewItem } from "."

const meta: Meta<typeof InView> = {
  title: "components/in-view",
  component: InView,
  args: {
    staggerChildren: {
      animation: "fromBottom",
      delay: 0,
      duration: 0.4,
      stagger: 0.2,
    },
  },
}

export default meta

type Story = StoryObj<typeof InView>

export const Default: Story = {
  render: (args) => (
    <InView as="ul" {...args}>
      <InViewItem as="li">Item 1</InViewItem>
      <InViewItem as="li">Item 2</InViewItem>
      <InViewItem as="li">Item 3</InViewItem>
    </InView>
  ),
}
