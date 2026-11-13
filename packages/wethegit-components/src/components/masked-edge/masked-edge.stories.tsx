import type { CSSProperties, ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { MaskedEdge } from "./masked-edge"

const pageStyle: CSSProperties = {
  background: "#e6f5ff",
  backgroundImage: 'url("/masked-edge-demo/rpg-fight-bg.gif")',
  backgroundSize: "cover",
  display: "flex",
  flexWrap: "wrap",
  padding: 32,
  width: "fit-content",
}

const cardStyle: CSSProperties = {
  background: "#bb3eac",
  color: "#fff",
  maxWidth: 460,
  padding: "88px 40px",
}

const narrowCardStyle: CSSProperties = {
  ...cardStyle,
  maxWidth: 560,
  padding: "32px 72px",
}

const framePanelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
}

function CardContent() {
  return (
    <>
      <h3 style={{ margin: "0 0 8px" }}>A masked edge</h3>
      <p style={{ margin: 0 }}>
        Use opaque artwork to cut out the edges of the container.
      </p>
    </>
  )
}

function Scene({ children }: { children: ReactNode }) {
  return <div style={pageStyle}>{children}</div>
}

const meta: Meta<typeof MaskedEdge> = {
  component: MaskedEdge,
  title: "components/masked-edge",
}

export default meta

type Story = StoryObj<typeof MaskedEdge>

export const Top: Story = {
  name: "Top",
  render: () => (
    <Scene>
      <MaskedEdge top="/masked-edge-demo/crumb-border.svg" size="30px" style={cardStyle}>
        <CardContent />
      </MaskedEdge>
    </Scene>
  ),
}

export const Bottom: Story = {
  name: "Bottom",
  render: () => (
    <Scene>
      <MaskedEdge
        bottom="/masked-edge-demo/crumb-border.svg"
        mirror
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </MaskedEdge>
    </Scene>
  ),
}

export const TopAndBottomMirror: Story = {
  name: "Top and Bottom - Mirrored",
  render: () => (
    <Scene>
      <MaskedEdge
        image="/masked-edge-demo/crumb-border.svg"
        sides="top bottom"
        mirror
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </MaskedEdge>
    </Scene>
  ),
}

export const TopAndBottom: Story = {
  name: "Top and Bottom - Unique",
  render: () => (
    <Scene>
      <MaskedEdge
        top="/masked-edge-demo/crumb-border.svg"
        bottom="/masked-edge-demo/crumb-border-bottom.png"
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </MaskedEdge>
    </Scene>
  ),
}

export const Right: Story = {
  name: "Right",
  render: () => (
    <Scene>
      <MaskedEdge
        right="/masked-edge-demo/edge-pattern-bite-vertical.png"
        mirror
        size="80px"
        style={narrowCardStyle}
      >
        <CardContent />
        <p>
          One asset set on the right and mirrored to flip it the desired direction. Repeat
          is not set, therefore the masked asset will stretch.
        </p>
      </MaskedEdge>
    </Scene>
  ),
}

export const LeftAndRight: Story = {
  name: "Left and right",
  render: () => (
    <Scene>
      <MaskedEdge
        image="/masked-edge-demo/edge-pattern-bite-vertical.png"
        sides="left right"
        mirror
        size="80px"
        style={narrowCardStyle}
      >
        <CardContent />
        <p>
          One asset set to the left and right, mirrored. They will stretch to the ends of
          the container if <u>repeat</u> is not set to tile the asset.
        </p>
      </MaskedEdge>
    </Scene>
  ),
}

export const Repeat: Story = {
  name: "Repeat and tile",
  render: () => (
    <Scene>
      <MaskedEdge
        image="/masked-edge-demo/edge-pattern.png"
        sides="top bottom"
        repeat
        tileSize="100px"
        size="40px"
        mirror
        style={{ ...cardStyle, padding: 100 }}
      >
        <CardContent />
        <p>
          A pattern set to the top and bottom edge and repeating. We can adjust the tile
          size or limit to a single side.
        </p>
      </MaskedEdge>
    </Scene>
  ),
}

export const FullFrame169: Story = {
  name: "Full frame 16:9",
  render: () => (
    <Scene>
      <div style={{ maxWidth: 500, width: "40vw" }}>
        <MaskedEdge image="/masked-edge-demo/frame-16-9.png" fullFrame>
          <div style={framePanelStyle}>
            <img src="/masked-edge-demo/water-animated.gif" alt="" />
          </div>
        </MaskedEdge>
      </div>
    </Scene>
  ),
}

export const FullFrame11: Story = {
  name: "Full frame 1:1",
  render: () => (
    <Scene>
      <div style={{ maxWidth: 400, width: "40vw" }}>
        <MaskedEdge image="/masked-edge-demo/frame-1-1.png" fullFrame frameAspect="1 / 1">
          <div style={framePanelStyle}>
            <img src="/masked-edge-demo/animated-1-1.gif" alt="" />
          </div>
        </MaskedEdge>
      </div>
    </Scene>
  ),
}
