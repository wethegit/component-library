import type { Meta, StoryObj } from "@storybook/react"

import { BreakpointSnipe } from "@local/components"

const meta = {
  title: "components/breakpoint-snipe",
  component: BreakpointSnipe,
} satisfies Meta<typeof BreakpointSnipe>

export default meta

type Story = StoryObj<typeof BreakpointSnipe>

/**
 * Scale the browser window to see the breakpoint snipe change value.
 */
export const Default: Story = {
  render: (props) => (
    <>
      <div style={{ minHeight: "100px", position: "relative" }}>
        <BreakpointSnipe {...props} />
      </div>
    </>
  ),
}
