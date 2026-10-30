import type { Meta, StoryObj } from "@storybook/react"

import { ScallopedEdge } from "@local/components"

const meta = {
  title: "components/scalloped-edge",
  component: ScallopedEdge,
} satisfies Meta<typeof ScallopedEdge>

export default meta

type Story = StoryObj<typeof ScallopedEdge>

export const Default: Story = {
  render: (props) => (
    <>
      <div style={{ minHeight: "100px", position: "relative" }}>
        <ScallopedEdge {...props} />
      </div>
    </>
  ),
}
