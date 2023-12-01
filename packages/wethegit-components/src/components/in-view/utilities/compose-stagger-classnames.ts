import type { StaggerOptions } from "@local/components"
import { buildFloatClassname } from "@local/components/in-view/utilities"
import styles from "@local/components/in-view/in-view.module.scss"

export function composeStaggerClassnames(staggerChildren?: StaggerOptions | boolean) {
  if (!staggerChildren) return ""

  const isBool = typeof staggerChildren === "boolean"

  // Keep in mind that these values are scoped, and are thus unrelated to
  // the component props of the same names:
  const animation = isBool ? "fade" : staggerChildren?.animation || "fade"
  const delay = isBool ? 0 : staggerChildren?.delay || 0
  const duration = isBool ? 0.4 : staggerChildren?.duration || 0.4
  const stagger = isBool ? 0.2 : staggerChildren?.stagger || 0.2

  return [
    styles.staggerChildren,
    styles[`${animation}Child`],
    !isNaN(stagger) && styles[buildFloatClassname("staggerAmount", stagger)],
    !isNaN(delay) && styles[buildFloatClassname("staggerDelay", delay)],
    !isNaN(duration) && styles[buildFloatClassname("staggerDuration", duration)],
  ]
}
