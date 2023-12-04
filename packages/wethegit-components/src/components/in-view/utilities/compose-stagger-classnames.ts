import { animation } from "@local/utilities"
import type { StaggerOptions } from "@local/components"
import { buildFloatClassname } from "@local/components/in-view/utilities"
import styles from "@local/components/in-view/components/in-view-item/in-view-item.module.scss"

export function composeStaggerClassnames(staggerChildren?: StaggerOptions | boolean) {
  if (!staggerChildren) return ""

  const isBool = typeof staggerChildren === "boolean"

  const anim = isBool ? animation.fade : staggerChildren?.animation || animation.fade
  const delay = isBool ? 0 : staggerChildren?.delay || 0
  const duration = isBool ? 0.4 : staggerChildren?.duration || 0.4
  const stagger = isBool ? 0.2 : staggerChildren?.stagger || 0.2

  return [
    styles.staggerChildren,
    anim,
    !isNaN(stagger) && styles[buildFloatClassname("staggerAmount", stagger)],
    !isNaN(delay) && styles[buildFloatClassname("staggerDelay", delay)],
    !isNaN(duration) && styles[buildFloatClassname("staggerDuration", duration)],
  ]
}
