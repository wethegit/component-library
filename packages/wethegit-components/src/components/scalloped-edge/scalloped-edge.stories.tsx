import type { CSSProperties, ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { ScallopedEdge } from "./scalloped-edge"

const pageStyle: CSSProperties = {
  background: "#e6f5ff",
  backgroundImage: 'url("/scalloped-edge-demo/rpg-fight-bg.gif")',
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

const meta: Meta<typeof ScallopedEdge> = {
  component: ScallopedEdge,
  title: "components/scalloped-edge",
}

export default meta

type Story = StoryObj<typeof ScallopedEdge>

export const Top: Story = {
  name: "Top",
  render: () => (
    <Scene>
      <ScallopedEdge
        top="/scalloped-edge-demo/crumb-border.svg"
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </ScallopedEdge>
    </Scene>
  ),
}

export const Bottom: Story = {
  name: "Bottom",
  render: () => (
    <Scene>
      <ScallopedEdge
        bottom="/scalloped-edge-demo/crumb-border.svg"
        mirror
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </ScallopedEdge>
    </Scene>
  ),
}

export const TopAndBottomMirror: Story = {
  name: "Top and Bottom - Mirrored",
  render: () => (
    <Scene>
      <ScallopedEdge
        image="/scalloped-edge-demo/crumb-border.svg"
        sides="top bottom"
        mirror
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </ScallopedEdge>
    </Scene>
  ),
}

export const TopAndBottom: Story = {
  name: "Top and Bottom - Unique",
  render: () => (
    <Scene>
      <ScallopedEdge
        top="/scalloped-edge-demo/crumb-border.svg"
        bottom="/scalloped-edge-demo/crumb-border-bottom.png"
        size="30px"
        style={cardStyle}
      >
        <CardContent />
      </ScallopedEdge>
    </Scene>
  ),
}

export const Right: Story = {
  name: "Right",
  render: () => (
    <Scene>
      <ScallopedEdge
        right="/scalloped-edge-demo/edge-pattern-vertical.png"
        mirror
        repeat
        tileSize="100px"
        style={narrowCardStyle}
      >
        <CardContent />
        <p>
          When we want the container taller, we can add more text. When we want the
          container taller, we can add more text. When we want the container taller, we
          can add more text.
        </p>
      </ScallopedEdge>
    </Scene>
  ),
}

export const LeftAndRight: Story = {
  name: "Left and right",
  render: () => (
    <Scene>
      <ScallopedEdge
        image="/scalloped-edge-demo/edge-pattern-vertical.png"
        sides="left right"
        mirror
        repeat
        tileSize="100px"
        size="40px"
        style={narrowCardStyle}
      >
        <CardContent />
        <p>
          When we want the container taller, we can add more text. When we want the
          container taller, we can add more text. When we want the container taller, we
          can add more text.
        </p>
      </ScallopedEdge>
    </Scene>
  ),
}

export const Repeat: Story = {
  name: "Repeat and tile",
  render: () => (
    <Scene>
      <ScallopedEdge
        image="/scalloped-edge-demo/edge-pattern.png"
        sides="top bottom"
        repeat
        tileSize="100px"
        size="40px"
        mirror
        style={{ ...cardStyle, padding: 100 }}
      >
        <CardContent />
      </ScallopedEdge>
    </Scene>
  ),
}

export const FullFrame169: Story = {
  name: "Full frame 16:9",
  render: () => (
    <Scene>
      <div style={{ maxWidth: 500, width: "40vw" }}>
        <ScallopedEdge image="/scalloped-edge-demo/frame-16-9.png" fullFrame>
          <div style={framePanelStyle}>
            <img src="/scalloped-edge-demo/water-animated.gif" alt="" />
          </div>
        </ScallopedEdge>
      </div>
    </Scene>
  ),
}

export const FullFrame11: Story = {
  name: "Full frame 1:1",
  render: () => (
    <Scene>
      <div style={{ maxWidth: 400, width: "40vw" }}>
        <ScallopedEdge
          image="/scalloped-edge-demo/frame-1-1.png"
          fullFrame
          frameAspect="1 / 1"
        >
          <div style={framePanelStyle}>
            <img src="/scalloped-edge-demo/animated-1-1.gif" alt="" />
          </div>
        </ScallopedEdge>
      </div>
    </Scene>
  ),
}
