import type { Meta, StoryObj } from "@storybook/react"

import { InView, InViewItem, Text } from "@local/components"

const meta: Meta<typeof InView> = {
  title: "components/in-view",
  component: InView,
  args: {
    threshold: 0.3,
    once: false,
    setInViewIfScrolledPast: false,
    matchRootMarginToThreshold: true,
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <>
        <div
          style={{
            height: "200px",
            textAlign: "center",
          }}
        >
          <div
            className="childSpacing"
            style={{
              overflow: "scroll",
              height: "500px",
            }}
          >
            <Text>Scroll down and then back up, to re-trigger the transition.</Text>
            <Story />
          </div>
        </div>
      </>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof InView>

export const Default: Story = {
  render: (args) => (
    <InView as="section" {...args}>
      <InViewItem as="ul" staggerChildren={{ animation: "fromBottom" }}>
        <li>Ipsum ullamco sit velit elit.</li>
        <li>Fugiat quis sit minim ipsum amet non excepteur eiusmod.</li>
        <InViewItem animation="scaleUp">
          Sunt adipisicing ullamco aliquip fugiat enim.
        </InViewItem>
      </InViewItem>
    </InView>
  ),
}
