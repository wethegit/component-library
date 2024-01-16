import type { Meta, StoryObj } from "@storybook/react"

import { VisuallyHiddenLinks, VisuallyHiddenLinkItem } from "@local/components"

const items = [
  {
    label: "Skip to main content",
    href: "#main-content",
  },
  {
    label: "Skip to news",
    href: "#news",
  },
  {
    label: "Skip to footer",
    href: "#footer",
  },
]

const meta: Meta<typeof VisuallyHiddenLinks> = {
  title: "components/visually-hidden-links",
  component: VisuallyHiddenLinks,
} satisfies Meta<typeof VisuallyHiddenLinks>

export default meta

type Story = StoryObj<typeof VisuallyHiddenLinks>

export const Default: Story = {
  render: () => (
    <>
      <p>
        Below is a list of `VisuallyHidden` anchor elements. They only appear when
        focussed upon. Try using the`tab` key on your keyboard within this frame.
      </p>
      <VisuallyHiddenLinks>
        {items.map((item) => {
          return (
            <VisuallyHiddenLinkItem key={item.href} href={item.href}>
              {item.label}
            </VisuallyHiddenLinkItem>
          )
        })}
      </VisuallyHiddenLinks>
    </>
  ),
}
