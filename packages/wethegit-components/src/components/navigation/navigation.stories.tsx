import type { Meta, StoryObj } from "@storybook/react"

import { Navigation } from "."

const LINKS = {
  home: {
    label: "Home",
    path: "/",
  },
  about: {
    label: "About",
    path: "/about",
  },
}

const meta: Meta<typeof Navigation> = {
  title: "components/navigation",
  component: Navigation,
  args: {
    links: LINKS,
    "aria-label": "Main navigation",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "200px",
          overflow: "auto",
        }}
      >
        <Story />
        <h3>This content is here to display the navigation sticky behavior.</h3>
        <p>
          Consectetur aute dolore aute incididunt ea tempor dolore commodo ipsum. Proident
          mollit ea consequat eiusmod esse occaecat ad cillum occaecat sit quis nostrud
          veniam. Nostrud qui ad esse mollit eu laborum duis occaecat reprehenderit veniam
          deserunt deserunt nostrud mollit. Aliqua quis irure aliquip eu. Incididunt duis
          magna sint eiusmod magna ullamco.
        </p>
        <p>
          Mollit eiusmod ipsum fugiat dolore cupidatat cupidatat. Sint sint eu pariatur
          consectetur est sit irure adipisicing pariatur. Eu veniam pariatur nostrud
          labore quis est occaecat dolor voluptate sunt quis ex. Aliquip laborum mollit
          est exercitation. Aute minim qui minim officia laboris veniam et labore irure
          commodo nostrud.
        </p>
        <p>
          Excepteur ullamco nostrud officia veniam qui adipisicing. Amet nisi duis enim
          sint ea ullamco adipisicing dolor consequat magna. Adipisicing proident tempor
          ea officia irure dolor minim laborum. In dolore do ad consequat occaecat commodo
          eu reprehenderit enim. Ea aliqua esse Lorem amet et eiusmod veniam eu veniam non
          consectetur enim labore ex. Ad laborum sunt minim ipsum officia dolor cillum.
        </p>
        <p>
          Veniam irure fugiat exercitation laborum id ad excepteur ipsum excepteur esse.
          Ea aliqua ad ullamco labore quis velit sint voluptate nisi nostrud tempor.
          Consectetur tempor dolor et do eu consectetur ad excepteur id duis non. Dolor
          deserunt voluptate incididunt amet adipisicing ullamco anim ad nisi dolore amet.
          Nostrud amet quis tempor id nulla laboris laboris ea do velit amet labore.
        </p>
        <p>
          Fugiat occaecat voluptate occaecat esse in mollit ex dolor ipsum quis et non
          anim cillum. Qui eu qui consectetur ut ea nisi consequat non non fugiat aliqua.
          Ut nisi eiusmod id ex minim ullamco consequat reprehenderit ea ipsum dolor.
          Tempor laborum laborum excepteur aliquip. Fugiat adipisicing aliqua nostrud
          cillum{" "}
        </p>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Navigation>

export const Default: Story = {}
