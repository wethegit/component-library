import type { CSSProperties } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { ImageGroup, ImageGroupItem } from "@local/components"

const meta: Meta<typeof ImageGroup> = {
  component: ImageGroup,
  title: "components/image-group",
  args: {
    as: "div",
  },
  argTypes: {
    as: {
      defaultValue: { summary: "p" },
    },
  },
} satisfies Meta<typeof ImageGroup>

export default meta

type Story = StoryObj<typeof ImageGroup>

const parentStyles = {
  "--parent-width": 300,
  "--parent-height": 300,
  inlineSize: "min(100%, 300px)",
  overflow: "auto",
  resize: "horizontal",
  textAlign: "center",
  outline: "1px solid #666",
}

const ethicalStyles = {
  "--left": 200,
  "--top": 100,
  "--width": 100,
}

const doersStyles = {
  "--left": 100,
  "--top": 0,
  "--width": 100,
}

const curiousStyles = {
  "--left": 100,
  "--top": 200,
  "--width": 100,
}

const collabStyles = {
  "--left": 0,
  "--top": 100,
  "--width": 100,
}

/**
 * All of ImageGroup's power comes from its CSS custom properties. See the Readme for usage info!
 *
 * Meanwhile, drag the bottom right corner of the demo below, to adjust the width of the `<ImageGroup>` and see how it behaves responsively.
 */
export const Default: Story = {
  render: (args) => (
    <ImageGroup {...args} style={parentStyles as CSSProperties}>
      <ImageGroupItem style={ethicalStyles as CSSProperties}>
        <img
          src="/image-group-demo/wtc-icons-ethical.png"
          alt="We are ethical. Heart brand mark."
        />
      </ImageGroupItem>
      <ImageGroupItem style={doersStyles as CSSProperties}>
        <img
          src="/image-group-demo/wtc-icons-doers.png"
          alt="We are doers. Lightning bolt brand mark."
        />
      </ImageGroupItem>
      <ImageGroupItem style={curiousStyles as CSSProperties}>
        <img
          src="/image-group-demo/wtc-icons-curious.png"
          alt="We are curious. Triangle brand mark."
        />
      </ImageGroupItem>
      <ImageGroupItem style={collabStyles as CSSProperties}>
        <img
          src="/image-group-demo/wtc-icons-collab.png"
          alt="We are curious. Triangle brand mark."
        />
      </ImageGroupItem>
    </ImageGroup>
  ),
}
