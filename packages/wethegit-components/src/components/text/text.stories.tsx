import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "@local/components"

const meta: Meta<typeof Text> = {
  component: Text,
  title: "components/text",
  tags: ["autodocs"],
  args: {
    as: "p",
  },
  argTypes: {
    as: {
      defaultValue: { summary: "p" },
    },
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  name: "Default",
  render: (args) => (
    <Text {...args}>
      Labore ullamco mollit aute esse enim laboris quis occaecat ipsum eu culpa deserunt
      ullamco. Quis duis pariatur eiusmod exercitation consectetur nostrud amet nostrud
      tempor consequat irure ut do non. In irure id veniam voluptate incididunt excepteur
      occaecat culpa. Consectetur qui ipsum nostrud elit aute ut dolore et pariatur
      cupidatat cupidatat reprehenderit.
    </Text>
  ),
}

export const ParagraphHeading: Story = {
  name: "Paragraph as a visual heading",
  render: ({ variant = "title-3", ...args }) => (
    <Text variant={variant} {...args}>
      The visual hierarchy does not always need to match the semantic heading hierarchy.
      In this example, we&apos;re rendering a paragraph tag <code>{"<p>"}</code> in the{" "}
      <em>style</em> of <code>title-3</code>. The important distinction to make here is
      that it is <em>not</em> an <code>{"<h3>"}</code> tag.
    </Text>
  ),
}
