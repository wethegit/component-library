import type { StaggerOptions } from "../animation/animation"
import { animation } from "../animation/animation"
import styles from "../styles/in-view-item.module.scss"

import { buildFloatClassname } from "./"

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
