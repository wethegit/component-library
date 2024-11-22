import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, waitFor, expect } from "@storybook/test"
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
    const modalRootRef = useRef<HTMLDivElement>(null)
    return (
      <>
        <div ref={modalRootRef}></div>
        {modalRootRef.current && (
          <Modal {...args} renderTo={modalRootRef.current}>
            <p style={{ color: "black", margin: 0 }}>
              <strong>Close</strong> button doesn't work because inside the story we use
              the <code>isOpen</code> control.
            </p>
          </Modal>
        )}
      </>
    )
  },
}

export const WithButtonTrigger: Story = {
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const modalRootRef = useRef<HTMLDivElement>(null)
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
        <div ref={modalRootRef}></div>
        {modalRootRef.current && (
          <Modal
            renderTo={modalRootRef.current}
            isOpen={isOpen}
            toggle={toggle}
            aria-label="My Modal"
          >
            <p style={{ color: "black", margin: 0 }}>Hey! The modal is open!</p>
          </Modal>
        )}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // modal shouldn't be visible
    expect(canvas.queryByRole("dialog")).not.toBeInTheDocument()

    // open the modal
    await userEvent.click(canvas.getByText("Open Modal"))

    // modal should be visible
    expect(canvas.getByRole("dialog")).toBeInTheDocument()

    // initial focus is the out of bounds div, with a single tab we should focus the close button
    await userEvent.tab()

    // close button should be focused
    expect(canvas.getByRole("button", { name: "Close" })).toHaveFocus()

    // close the modal
    await userEvent.click(canvas.getByRole("button", { name: "Close" }))

    // modal shouldn't be visible
    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument()
    })

    // focus should be back on the trigger button
    expect(canvas.getByRole("button", { name: "Open Modal" })).toHaveFocus()
  },
}
