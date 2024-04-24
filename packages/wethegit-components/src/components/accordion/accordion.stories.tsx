import type { Meta, StoryObj } from "@storybook/react"

import { Accordion } from "."

const meta: Meta<typeof Accordion> = {
  title: "components/accordion",
  component: Accordion,
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {}
