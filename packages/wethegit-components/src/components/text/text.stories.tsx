import type { Meta, StoryObj } from "@storybook/react"

import { Text } from "@local/components"

const meta: Meta<typeof Text> = {
  component: Text,
  title: "components/text",
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
    <Text variant={variant} {...args} as="p">
      The visual hierarchy does not always need to match the semantic heading hierarchy.
      In this example, we&apos;re rendering a paragraph tag <code>{"<p>"}</code> in the{" "}
      <em>style</em> of <code>title-3</code>. The important distinction to make here is
      that it is <em>not</em> an <code>{"<h3>"}</code> tag.
    </Text>
  ),
}

export const TypeSpectrum: Story = {
  name: "Full typography spectrum",
  render: () => (
    <div className="child-spacing">
      {/*
        TODO: REMOVE THESE CHILD SPACING CLASSES.
        Use the spacing components or utility class names we build, once they're ready.
      */}

      <Text>
        All of the available variants are shown below, using their default sizes. These
        sizes are customizable on a per-project basis, and can vary between different
        responsive breakpoints.
      </Text>

      <div className="child-spacing child-spacing--less">
        <Text as="h1" variant="title-1">
          Title 1
        </Text>
        <Text as="h2" variant="title-2">
          Title 2
        </Text>
        <Text as="h3" variant="title-3">
          Title 3
        </Text>
        <Text as="h4" variant="title-4">
          Title 4
        </Text>
        <Text as="h5" variant="title-5">
          Title 5
        </Text>
        <Text as="h6" variant="title-6">
          Title 6
        </Text>
        <Text variant="body-larger">Body larger</Text>
        <Text variant="body">Body</Text>
        <Text variant="body-smaller">Body smaller</Text>
        <Text variant="body-legal">Body legal</Text>
      </div>
    </div>
  ),
}
