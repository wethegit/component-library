import type { Meta, StoryObj } from "@storybook/react"

import { InView, InViewItem, Text } from "@local/components"
import { animation } from "@local/utilities"

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
            border: "1px solid #666",
            height: "200px",
            overflow: "auto",
            paddingTop: "1rem",
            textAlign: "center",
          }}
        >
          <div
            className="childSpacing"
            style={{
              height: "500px",
              overflowX: "hidden",
            }}
          >
            <Text variant="body-legal">
              (scroll down and then back up, to re-trigger the transitions)
            </Text>
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
      <InViewItem as="ul" animation={animation.scaleUp}>
        <li>
          This entire list is animated in using the <strong>"animation.scaleUp"</strong>{" "}
          option.
        </li>
        <li>Fugiat quis sit minim ipsum amet non excepteur eiusmod.</li>
        <li>Sunt adipisicing ullamco aliquip fugiat enim.</li>
      </InViewItem>
    </InView>
  ),
}

export const AnimationExamples: Story = {
  name: "Various animation examples",
  render: (args) => (
    <>
      <InView as="section" {...args}>
        <ul>
          <InViewItem as="li" duration={1} animation={animation.fromLeft}>
            The individual list items are animated in. This uses the{" "}
            <strong>"animation.fromLeft"</strong> option.
          </InViewItem>
          <InViewItem as="li" duration={1} animation={animation.fromRight}>
            This uses the <strong>"animation.fromRight"</strong> option.
          </InViewItem>
          <InViewItem as="li" duration={1} animation={animation.fromBottom}>
            This uses the <strong>"animation.fromTop"</strong> option.
          </InViewItem>
        </ul>
      </InView>

      <InView as="ul" {...args}>
        <InViewItem as="li" animation={animation.scaleUp}>
          This uses "animation.scaleUp"
        </InViewItem>
        <InViewItem as="li" animation={animation.fade} delay={0.3}>
          This uses "animation.fade"
        </InViewItem>
      </InView>
    </>
  ),
}

export const StaggerChildren: Story = {
  name: "Auto-stagger children",
  render: (args) => (
    <InView as="section" {...args}>
      <InViewItem
        as="ul"
        staggerChildren={{ animation: animation.fromBottomFixed, stagger: 0.2, delay: 0 }}
      >
        <li>
          Each list item is automatically sequenced, using the{" "}
          <strong>staggerChildren</strong> option with a{" "}
          <strong>animation.fromBottomFixed</strong> preset.
        </li>
        <li>Fugiat quis sit minim ipsum amet non excepteur eiusmod.</li>
        <li>Sunt adipisicing ullamco aliquip fugiat enim.</li>
        <li>Ipsum ullamco sit velit elit.</li>
      </InViewItem>
    </InView>
  ),
}
