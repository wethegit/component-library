import type { Meta, StoryObj } from "@storybook/react"

import { InView, InViewItem } from "."

const meta: Meta<typeof InView> = {
  title: "components/in-view",
  component: InView,
  args: {
    animation: "fromLeft",
    duration: 0.5,
    delay: 0,
    staggerChildren: {
      animation: "scaleUp",
      delay: 0,
      duration: 0.4,
      stagger: 0.2,
    },
  },
  argTypes: {
    delay: { control: { type: "number", max: 1, min: 0, step: 0.1 } },
    duration: { control: { type: "number", max: 2, min: 0, step: 0.1 } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "blue",
          height: "200px",
          overflow: "auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof InView>

export const Default: Story = {
  render: (args) => (
    <InView as="ul" {...args}>
      <InViewItem as="li">Item 1</InViewItem>
      <InViewItem as="li" animation="fromLeft">
        Item 2
      </InViewItem>
      <InViewItem as="li">Item 3</InViewItem>
    </InView>
  ),
}
