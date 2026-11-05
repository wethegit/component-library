import { expect } from "@storybook/test"

import { visibility } from "./visibility"
import styles from "./visibility.module.scss"

export default {}

export const Test = {
  render: () => <></>,
  play: async () => {
    // expect to return the object in the correct transformed format
    const visibilityObject = {
      smOnly: styles["sm-only"],
      mdOnly: styles["md-only"],
      mdUp: styles["md-up"],
      lgOnly: styles["lg-only"],
      lgUp: styles["lg-up"],
      xlOnly: styles["xl-only"],
      xlUp: styles["xl-up"],
      xxlUp: styles["xxl-up"],
    }
    expect(visibility).toEqual(visibilityObject)
  },
}
