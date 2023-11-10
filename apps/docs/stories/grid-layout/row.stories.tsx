import type { Meta, StoryObj } from '@storybook/react'
import { Row, Column } from '@wethegit/components'

const meta: Meta<typeof Row> = {
  title: 'components/grid-layout/row',
  component: Row,
  args: {
    as: 'div',
  },
  argTypes: {
    as: {
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'div' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Row>

export const Default: Story = {
  render: (args) => (
    <Row {...args}>
      <Column span={5}>
        <p>This column spans five columns.</p>
        <p>
          It contains a much longer paragraph. Enim occaecat voluptate proident
          excepteur sint cupidatat exercitation eiusmod irure occaecat cillum.
          Aliqua quis aliquip qui dolor non sint laboris nulla ex aliquip. Sunt
          cillum ut non reprehenderit. Irure Lorem magna ad magna incididunt eu
          laborum commodo nulla labore ea excepteur Lorem. Eu veniam eu occaecat
          tempor commodo labore enim fugiat ut. Non eu eiusmod duis velit est.
        </p>
      </Column>
      <Column span={{ md: 8, xl: 5 }}>
        <p>
          This column spans eight columns on medium and large, and five columns
          on xlarge+.
        </p>
      </Column>
    </Row>
  ),
  name: 'Row',
}
