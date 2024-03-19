import { useCallback, useRef } from "react"
import { useUserPrefs, useInView } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities"

import styles from "./back-to-top.module.scss"

export type EasingFunction = (delta: number) => number

export interface BackToTopProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Easing function for the scroll animation. Defaults to an in-out sine curve.
   */
  easingFunction?: EasingFunction
  /**
   * Valid CSS selector referencing the DOM element to shift focus to on completion of scroll.
   */
  focusOnCompleteCssSelector: string
  /**
   * Callback to run after completion of scroll.
   */
  onComplete?: (element: HTMLButtonElement | null) => void
  /**
   * Number of pixels to scroll per second, when motion is enabled.
   */
  pixelsPerSecond?: number
  /**
   * CSS height value corresponding to amount of distance to scroll before the button is revealed. Defaults to "85vh". Set this to `"0"` to have the button persist at all times.
   */
  revealThreshold: string
}

export function BackToTop({
  easingFunction,
  focusOnCompleteCssSelector = "#main-content",
  onComplete,
  pixelsPerSecond = 2000,
  revealThreshold = "85vh",
  className,
  children,
  ...props
}: BackToTopProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { prefersReducedMotion } = useUserPrefs()
  const [setReferenceRef, referenceIsInView] = useInView(1, false, false)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (typeof window === "undefined") return

      // Check if they passed an onClick
      const onClick = props.onClick
      if (onClick && typeof onClick === "function") onClick(event)

      const position = window.scrollY
      const duration = prefersReducedMotion ? 0 : getDuration(position, pixelsPerSecond)
      let starttime: null | number = null

      const animate = (delta: number) => {
        if (starttime === null) starttime = 0

        const playHead = clamp(0, 1, (delta - starttime) / duration)
        const easedPlayHead = easingFunction
          ? easingFunction(playHead)
          : Math.sin(playHead * Math.PI * 0.5)
        const newPos = lerp(position, 0, easedPlayHead)

        window.scroll(0, newPos)

        if (delta - starttime < duration) requestAnimationFrame(animate)

        // complete
        focusContent(focusOnCompleteCssSelector)
        if (onComplete) onComplete(buttonRef.current)
      }

      requestAnimationFrame(animate)
    },
    [prefersReducedMotion]
  )

  return (
    <>
      {/* this is a reference element, so that we know when to show the button */}
      <div
        className={styles.viewportReference}
        ref={setReferenceRef}
        style={{ "--reveal-threshold": revealThreshold } as React.CSSProperties}
      />

      <button
        ref={buttonRef}
        className={classnames([
          styles.button,
          (!referenceIsInView || revealThreshold.startsWith("0")) && styles.buttonShown,
          className,
        ])}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    </>
  )
}

// shifts focus to the CSS selector specified.
function focusContent(cssSelector: string) {
  if (typeof window === "undefined") return
  const mainContentAnchor = document.querySelector(cssSelector) as HTMLElement
  if (!mainContentAnchor) return
  mainContentAnchor.tabIndex = -1
  mainContentAnchor.focus({ preventScroll: true })
}

// returns a dynamic speed, based on the distance from the top of the document.
function getDuration(distance: number, pixelsPerSecond: number) {
  return Math.floor((distance / pixelsPerSecond) * 1000)
}

// clamps value v between a and b.
function clamp(a: number, b: number, v: number): number {
  return Math.min(b, Math.max(a, v))
}

// linearly interpolate between values v1 and v2, based on d (delta).
function lerp(v1: number, v2: number, d: number) {
  return v1 + d * (v2 - v1)
}
