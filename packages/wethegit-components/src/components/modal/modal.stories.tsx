import type { Meta, StoryObj } from "@storybook/react"
import { UserPreferencesProvider } from "@wethegit/react-hooks"

import { Modal } from "./modal"

const meta = {
  title: "components/modal",
  component: Modal,
  args: {
    trigger: (toggle) => <button onClick={toggle}>Open Modal</button>,
    appendToBody: false,
  },
  argTypes: {
    appendToBody: {
      description:
        "If true the modal will be appended to the body instead of the parent element.",
      defaultValue: { summary: false },
    },
  },
  decorators: [
    (Story) => (
      <UserPreferencesProvider>
        <div style={{ height: 500 }}>
          <Story />
        </div>
      </UserPreferencesProvider>
    ),
  ],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: (args) => (
    <Modal {...args}>
      <p style={{ color: "black", margin: 0 }}>
        Excepteur mollit laboris culpa commodo ex.
      </p>
    </Modal>
  ),
}
