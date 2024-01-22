import type { Meta, StoryObj } from "@storybook/react"

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
}
