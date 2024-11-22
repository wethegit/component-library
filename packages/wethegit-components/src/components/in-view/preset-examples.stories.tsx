import type { Meta, StoryObj } from "@storybook/react"

import { InView, InViewItem, Text } from "@local/components"

import { animation } from "./components"

type Story = StoryObj<typeof InView>

type WrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => (
  <div
    style={{
      border: "1px solid #666",
      height: "200px",
      overflow: "auto",
      paddingTop: "1rem",
      textAlign: "center",
    }}
  >
    {children}
  </div>
)

const Inner = ({ children }: WrapperProps) => (
  <div className="childSpacing" style={{ overflowX: "hidden" }}>
    {children}
  </div>
)

const meta: Meta<typeof InView> = {
  title: "components/in-view/Presets",
  component: InView,
  args: {
    observerOptions: 0.3,
    once: false,
    setInViewIfScrolledPast: false,
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <Wrapper>
        <Inner>
          <Text variant="body-legal">
            (scroll down and then back up, to re-trigger the transitions)
          </Text>
          <Story />
        </Inner>
      </Wrapper>
    ),
  ],
}

export default meta

const Box = () => {
  return (
    <div
      style={{
        inlineSize: "60px",
        aspectRatio: "1/1",
        background: "yellow",
      }}
    />
  )
}

const makeBoxes = ({ args, animationKey = "fade" }) => {
  return (
    <>
      {Array(6)
        .fill("")
        .map((i) => (
          <InView
            key={i}
            as="section"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
            {...args}
          >
            <InViewItem animation={animation[animationKey]}>
              <Box />
            </InViewItem>
          </InView>
        ))}
    </>
  )
}

export const Fade: Story = {
  render: (args) => makeBoxes({ args, animationKey: "fade" }),
}
export const ScaleUp: Story = {
  render: (args) => makeBoxes({ args, animationKey: "scaleUp" }),
}
export const FromBottom: Story = {
  render: (args) => makeBoxes({ args, animationKey: "fromBottom" }),
}
export const FromBottomFixed: Story = {
  render: (args) => makeBoxes({ args, animationKey: "fromBottomFixed" }),
}
export const FromTop: Story = {
  render: (args) => makeBoxes({ args, animationKey: "fromTop" }),
}
export const FromLeft: Story = {
  render: (args) => makeBoxes({ args, animationKey: "fromLeft" }),
}
export const FromRight: Story = {
  render: (args) => makeBoxes({ args, animationKey: "fromRight" }),
}
