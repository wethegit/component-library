import type {
  AnimationDelay,
  AnimationDuration,
  AnimationPreset,
} from "../animation/animation"
import styles from "../styles/in-view-item.module.scss"

import { buildFloatClassname } from "./"

export type ComposeAnimateClassnamesArgs = {
  /** CSS module className for the animation */
  animation?: AnimationPreset | string
  delay?: AnimationDelay
  duration?: AnimationDuration
}

export function composeAnimateClassnames({
  animation,
  delay,
  duration,
}: ComposeAnimateClassnamesArgs) {
  const animClass = animation || ""

  const delayClass =
    typeof delay === "number" &&
    !isNaN(delay) &&
    styles[buildFloatClassname("delay", delay)]

  const durationClass =
    typeof duration === "number" &&
    !isNaN(duration) &&
    styles[buildFloatClassname("duration", duration)]

  return [animClass, delayClass, durationClass]
}
