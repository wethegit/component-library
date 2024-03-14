import type { Meta, StoryObj } from "@storybook/react"

import { BackToTop, Text } from "@local/components"

const meta: Meta<typeof BackToTop> = {
  title: "components/back-to-top",
  component: BackToTop,
  args: {
    easingFunction: undefined,
    focusOnCompleteCssSelector: "#focus-me-on-complete",
    onComplete: undefined,
    pixelsPerSecond: 2000,
    revealThreshold: "85vh",
  },
  argTypes: {
    easingFunction: {
      control: "function",
    },
    onComplete: {
      control: "function",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ height: "400px", overflow: "auto", textAlign: "center" }}
        className="childSpacing"
      >
        <Text>🎉 Yay, caveats!</Text>
        <Text variant="body-smaller">
          This story is <em>only</em> here to document all of the available props on the{" "}
          <code>BackToTop</code> component. There are a handful of customizations needed
          in order to make this component work within a Storybook Story, so please test
          this component in-situ when contributing instead.
        </Text>
        <Text variant="body-legal">
          ⚠️ The <code>revealThreshold</code> prop will have no effect within Storybook,
          as the browser's default IntersectionObserver root is <code>window</code>. In
          practice, if you need your back-to-top button to be scoped to a particular div
          (this is rare), please add the necessary{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer"
            target="_blank"
          >
            IntersectionObserver options
          </a>{" "}
          to the <code>useInView</code> hook in the component itself.
        </Text>
        <Text variant="body-legal">
          ⚠️ The "back-to-top" scrolling on this component affects the window, not the
          Story itself. So you will not see anything unless your window is scrolled down a
          bit. Change this within the component if you need to.
        </Text>
        <div id="focus-me-on-complete" style={{ height: "1000px", position: "relative" }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BackToTop>

export const Default: Story = {
  render: (args) => (
    <BackToTop
      style={{
        position: "sticky",
        top: "1rem",
        bottom: "auto",
      }}
      {...args}
    >
      Back to top!
    </BackToTop>
  ),
}
