import { useEffect, useRef, useState } from "react"
import { useUserPrefs } from "@wethegit/react-hooks"

export interface AnimatePresenceProps {
  /**
   * Visibility of the component
   */
  isVisible: boolean
  /**
   * Initial state of the animation
   * @defaultValue false
   */
  initial?: boolean
  /**
   * Duration in miliseconds or object with enter and exit duration in miliseconds
   * @defaultValue = 300
   */
  duration?:
    | number
    | {
        enter: number
        exit: number
      }
}

export interface AnimatePresenceReturn {
  /**
   * Render your component **only** if `shouldRender` is `true`
   */
  shouldRender: boolean
  /**
   * `reveal` is an shorthand for animating the component in and out
   */
  reveal: boolean
  /**
   * Duration of the current animation
   */
  runningDuration: number
  /**
   * Current state of the animation. Use it for full control of the animation in all states
   */
  state: AnimatePresenceState
}

export enum AnimatePresenceState {
  ENTERED = "entered",
  EXITED = "exited",
  EXITING = "exiting",
  ENTERING = "entering",
  MOUNTED = "mounted",
}

/**
 * AnimatePresence is a very simple hook that helps you animate components in and out.
 * You are in full control of the animation and the hook only provides you with the current state and the current duration of the animation.
 * It also takes care of accessibility by forcing duration to `0` if the user has enabled reduced motion.
 */
export function useAnimatePresence({
  initial = false,
  duration = 300,
  isVisible = false,
}: AnimatePresenceProps): AnimatePresenceReturn {
  const { prefersReducedMotion } = useUserPrefs()
  const skipMountAnimation = useRef<boolean>(initial)
  const [state, setState] = useState<AnimatePresenceState>(
    skipMountAnimation.current
      ? AnimatePresenceState.ENTERED
      : AnimatePresenceState.EXITED
  )
  const durationEnter = prefersReducedMotion
    ? 0
    : typeof duration === "number"
    ? duration
    : duration.enter

  const durationExit = prefersReducedMotion
    ? 0
    : typeof duration === "number"
    ? duration
    : duration.exit

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    clearTimeout(timer.current)

    console.log({ state })

    if (state === AnimatePresenceState.MOUNTED) {
      timer.current = setTimeout(() => {
        setState(AnimatePresenceState.ENTERING)
      }, 10)
    } else if (state === AnimatePresenceState.ENTERING) {
      timer.current = setTimeout(() => {
        setState(AnimatePresenceState.ENTERED)
      }, durationEnter)
    } else if (state === AnimatePresenceState.EXITING) {
      timer.current = setTimeout(() => {
        setState(AnimatePresenceState.EXITED)
      }, durationExit)
    }
  }, [state])

  useEffect(() => {
    if (skipMountAnimation.current) {
      skipMountAnimation.current = false
      return
    }

    if (isVisible) {
      if (
        state === AnimatePresenceState.EXITED ||
        state === AnimatePresenceState.EXITING
      ) {
        setState(AnimatePresenceState.MOUNTED)
      }
    } else {
      if (
        state === AnimatePresenceState.ENTERED ||
        state === AnimatePresenceState.ENTERING
      ) {
        setState(AnimatePresenceState.EXITING)
      }
    }
  }, [isVisible])

  return {
    shouldRender: state !== AnimatePresenceState.EXITED,
    reveal:
      state === AnimatePresenceState.ENTERING || state === AnimatePresenceState.ENTERED,
    runningDuration:
      state === AnimatePresenceState.ENTERING ? durationEnter : durationExit,
    state,
  }
}
