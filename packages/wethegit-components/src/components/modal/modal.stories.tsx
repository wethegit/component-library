import type { Meta, StoryObj } from "@storybook/react"
import { UserPreferencesProvider } from "@wethegit/react-hooks"

import { Modal } from "./modal"

const meta = {
  title: "components/modal",
  component: Modal,
  args: {
    isOpen: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: 500 }}>
        <UserPreferencesProvider>
          <Story />
        </UserPreferencesProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: (args) => {
    return (
      <Modal {...args}>
        <p style={{ color: "black", margin: 0 }}>
          <strong>Close</strong> button doesn't work becayse inside the story we use the{" "}
          <code>isOpen</code> control.
        </p>
      </Modal>
    )
  },
}
