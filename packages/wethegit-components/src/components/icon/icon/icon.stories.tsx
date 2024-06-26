import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Icon, IconDefs, IconSymbol } from "@local/components"

const meta = {
  title: "components/icon",
  component: Icon,
  args: {
    id: "play",
  },
  decorators: [
    (Story) => (
      <>
        <IconDefs>
          <IconSymbol id="play" size={27}>
            <path d="M27 13.2396L5.6875 26.4792L5.6875 -9.31519e-07L27 13.2396Z" />
          </IconSymbol>
        </IconDefs>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  render: (args) => <Icon {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const icon = canvas.getByRole("img", { hidden: true })

    expect(icon).toBeInTheDocument()

    // without an alt prop provided, aria-hidden should be true
    expect(icon.getAttribute("aria-hidden")).toEqual("true")
    expect(icon.hasAttribute("aria-label")).toBe(false)
  },
}

export const WithAlt: Story = {
  render: (args) => {
    return <Icon {...args} />
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    if (args.alt) {
      const icon = canvas.getByLabelText(args.alt)

      expect(icon).toBeInTheDocument()
      expect(icon.getAttribute("aria-label")).toEqual(args.alt)
      expect(icon.getAttribute("aria-hidden")).toEqual("false")
    }
  },
}
