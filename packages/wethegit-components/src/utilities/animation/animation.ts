import styles from "./animation.module.scss"

export const ANIMATION_PRESETS = [
  "fade",
  "fromBottom",
  "fromBottomFixed",
  "fromLeft",
  "fromRight",
  "fromTop",
  "scaleUp",
] as const

export type AnimationPreset = (typeof ANIMATION_PRESETS)[number]

type AnimationCSSModules = Record<AnimationPreset, string>

const animation = {} as AnimationCSSModules

ANIMATION_PRESETS.forEach((preset) => {
  animation[preset] = styles[preset]
})

export { animation }
