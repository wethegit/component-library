import type {
  Animation,
  AnimationDelay,
  AnimationDuration,
} from "@local/components/in-view/"
import { buildFloatClassname } from "@local/components/in-view/utilities"
import styles from "@local/components/in-view/components/in-view-item/in-view-item.module.scss"

export type ComposeAnimateClassnamesArgs = {
  animation?: Animation
  delay?: AnimationDelay
  duration?: AnimationDuration
}

export function composeAnimateClassnames({
  animation,
  delay,
  duration,
}: ComposeAnimateClassnamesArgs) {
  const animClass = animation ? styles[animation] : ""

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
