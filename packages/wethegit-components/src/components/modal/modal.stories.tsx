import type { Meta, StoryObj } from "@storybook/react"
import { UserPreferencesProvider } from "@wethegit/react-hooks"
import { useModal } from "@wethegit/react-modal"
import { useRef } from "react"

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
      <Modal {...args} appendToBody={false}>
        <p style={{ color: "black", margin: 0 }}>
          <strong>Close</strong> button doesn't work becayse inside the story we use the{" "}
          <code>isOpen</code> control.
        </p>
      </Modal>
    )
  },
}

export const WithButtonTrigger: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const { isOpen, toggle } = useModal({
      triggerRef,
    })

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        <button
          ref={triggerRef}
          onClick={toggle}
          style={{
            backgroundColor: "cyan",
            padding: "20px",
            color: "black",
            fontFamily: "sans-serif",
            borderRadius: "5px",
          }}
        >
          {isOpen ? "Close" : "Open"} Modal
        </button>
        <Modal isOpen={isOpen} toggle={toggle}>
          <p style={{ color: "black", margin: 0 }}>
            <strong>Close</strong> button doesn't work becayse inside the story we use the{" "}
            <code>isOpen</code> control.
          </p>
        </Modal>
      </div>
    )
  },
}
