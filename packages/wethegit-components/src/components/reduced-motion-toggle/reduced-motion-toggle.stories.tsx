import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, waitFor, within } from "@storybook/test"
import { UserPreferencesProvider } from "@wethegit/react-hooks"

import { ReducedMotionToggle } from "./reduced-motion-toggle"

const STORAGE_KEY = "user-prefs:prefers-reduced-motion"

const meta: Meta<typeof ReducedMotionToggle> = {
  title: "components/reduced-motion-toggle",
  component: ReducedMotionToggle,
  decorators: [
    (Story) => (
      <UserPreferencesProvider>
        <Story />
      </UserPreferencesProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ReducedMotionToggle>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("switch", { name: "Reduced motion" })
    const initial = toggle.getAttribute("aria-checked") === "true"

    await userEvent.click(toggle)

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-checked", String(!initial))
    })
    expect(window.localStorage.getItem(STORAGE_KEY)).toEqual(String(!initial))

    await userEvent.click(toggle)

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-checked", String(initial))
    })
  },
}

export const CustomLabel: Story = { args: { children: "Turn off animations" } }
