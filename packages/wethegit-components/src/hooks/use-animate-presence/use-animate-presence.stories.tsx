import type { Meta, StoryObj } from "@storybook/react"

import { AnimatePresenceProps, useAnimatePresence } from "./use-animate-presence"

const meta: Meta = {
  title: "hooks/useAnimatePresence",
  args: {
    isVisible: false,
    duration: {
      enter: 1000,
      exit: 300,
    },
  },
  argTypes: {
    isVisible: {
      controls: {
        type: "boolean",
      },
      description: "Whether the element is visible or not.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    duration: {
      control: {
        type: "object",
      },
      table: {
        defaultValue: { summary: 300 },
      },
      description: "The duration of the animation. Can be an `object` or a `number`.",
    },
    initial: {
      control: {
        type: "boolean",
      },
      description: "Whether the element should be visible on initial render.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
}

export default meta

type Story = StoryObj<AnimatePresenceProps>

export const Default: Story = {
  render: ({ isVisible, duration }) => {
    const { shouldRender, reveal, runningDuration } = useAnimatePresence({
      duration,
      isVisible,
    })

    if (!shouldRender) return <></>

    return (
      <div
        style={{
          transition: `all ${runningDuration}ms ease`,
          opacity: reveal ? 1 : 0,
          transform: reveal ? "scale(1)" : "scale(0)",
          display: "inline-block",
        }}
      >
        Hey! I animate in and out!
      </div>
    )
  },
}

export const CustomAnimation: Story = {
  render: ({
    isVisible,
    duration = {
      enter: 1000,
      exit: 300,
    },
  }) => {
    const { shouldRender, reveal, runningDuration } = useAnimatePresence({
      duration,
      isVisible,
    })

    if (!shouldRender) return <></>

    return (
      <div
        style={{
          transition: `all 300ms ease`,
          transitionDuration: `${runningDuration}ms`,
          opacity: reveal ? 1 : 0,
          transform: reveal ? "scale(1)" : "scale(0) rotate(360deg)",
          transitionTimingFunction: reveal
            ? "cubic-bezier(.79,0,0,1.58)"
            : "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          display: "inline-block",
        }}
      >
        I started out visible!
      </div>
    )
  },
}

export const DoNotAnimateOnMount: Story = {
  render: ({ isVisible, duration }) => {
    const { shouldRender, reveal, runningDuration } = useAnimatePresence({
      duration,
      isVisible,
      initial: true,
    })

    if (!shouldRender) return <></>

    return (
      <div
        style={{
          transition: `all ${runningDuration}ms ease`,
          opacity: reveal ? 1 : 0,
          transform: reveal ? "scale(1)" : "scale(0)",
          display: "inline-block",
        }}
      >
        I started out visible!
      </div>
    )
  },
}
