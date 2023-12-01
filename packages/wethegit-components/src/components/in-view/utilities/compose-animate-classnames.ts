import type { Animation, AnimationDelay, AnimationDuration } from "@local/components"
import { buildFloatClassname } from "@local/components/in-view/utilities"
import styles from "@local/components/in-view/in-view.module.scss"

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
  if (!animation) return ""

  const delayClass =
    typeof delay === "number" &&
    !isNaN(delay) &&
    styles[buildFloatClassname("delay", delay)]

  const durationClass =
    typeof duration === "number" &&
    !isNaN(duration) &&
    styles[buildFloatClassname("duration", duration)]

  return [styles.animate, styles[animation], delayClass, durationClass]
}
