import { expect, within } from "@storybook/test"
import { StoryObj } from "@storybook/react"

import { Text } from "@local/components"

import { classnames } from "./classnames"

export default {
  args: {
    className: classnames(["test1", "test2"]),
  },
}

export const Test: StoryObj<typeof Text> = {
  render: (args) => (
    <Text data-testid="classnames-test" {...args}>
      {`"${classnames([args.className])}" = classnames([${args.className?.split(" ")}])`}
    </Text>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const textElement = canvas.getByTestId("classnames-test")

    expect(textElement).toBeInTheDocument()

    // test cases using the classnames on a Text component
    expect(textElement.getAttribute("class")).toContain("test1")
    expect(textElement.getAttribute("class")).toContain("test2")

    // test cases using the classnames directly
    expect(typeof classnames(["test1", "test2, test3"])).toBe("string")
    expect(classnames(["test1", "test2", "test3"])).toBe("test1 test2 test3")
  },
}
