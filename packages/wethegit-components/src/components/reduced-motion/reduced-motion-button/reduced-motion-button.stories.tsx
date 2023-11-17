import { UserPreferencesProvider } from "@wethegit/react-hooks"
import type { Meta, StoryObj } from "@storybook/react"

import { ReducedMotionButton } from "."

const meta = {
  title: "components/reduced-motion-button",
  component: ReducedMotionButton,
  decorators: [
    (Story) => (
      <UserPreferencesProvider>
        <Story />
      </UserPreferencesProvider>
    ),
  ],
} satisfies Meta<typeof ReducedMotionButton>

export default meta

type Story = StoryObj<typeof ReducedMotionButton>

export const Default: Story = {}
