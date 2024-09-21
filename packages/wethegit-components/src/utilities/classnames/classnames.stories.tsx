import { expect } from "@storybook/test"

import { classnames } from "./classnames"

export default {}

export const Test = {
  render: () => <></>,
  play: async () => {
    // passing all kinds of types and expecting return type string
    expect(
      typeof classnames(["button", "primary", ["is-active", null, undefined], 2, "2"])
    ).toBe("string")

    // // passing all kinds of types and expecting extact result "button primary is-active 2"
    expect(
      classnames(["button", "primary", ["is-active", null, undefined], 2, "2"])
    ).toBe("button primary is-active 2")

    // passing only string and expecting extact result "button primary is-active"
    expect(classnames(["button", "primary", "is-active"])).toBe(
      "button primary is-active"
    )

    // passing null and expecting an empty string
    expect(classnames(null)).toBe("")

    // passing undefined and expecting an empty string
    expect(classnames(undefined)).toBe("")

    // passing nested array + double nested array and expecting exact result "button active"
    expect(classnames([["button"], [["active"]]])).toBe("button active")

    // passing array + nested array and expecting exact result "button active"
    expect(classnames(["button", ["active"]])).toBe("button active")

    // passding a number and expecting an empty string
    expect(classnames(2)).toBe("")

    // passing an object and expecting an empty string
    expect(classnames({ classname: "test" })).toBe("")
  },
}
