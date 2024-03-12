import { useCallback, useRef } from "react"
import { useUserPrefs, useInView } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities"

import styles from "./back-to-top.module.scss"

const FOCUS_ON_COMPLETE_SELECTOR = "#main-content"

export interface BackToTopProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function BackToTop({
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
      const duration = prefersReducedMotion ? 0 : getDuration(position)
      let starttime: null | number = null

      const animate = (delta: number) => {
        if (starttime === null) starttime = 0

        const playHead = clamp(0, 1, (delta - starttime) / duration)
        const easedPlayHead = Math.sin(playHead * Math.PI * 0.5)
        const newPos = lerp(position, 0, easedPlayHead)

        window.scroll(0, newPos)

        if (delta - starttime < duration) requestAnimationFrame(animate)

        // complete
        focusContent(FOCUS_ON_COMPLETE_SELECTOR)
      }

      requestAnimationFrame(animate)
    },
    [prefersReducedMotion]
  )

  return (
    <>
      {/* this is a reference element, so that we know when to show the button */}
      <div className={styles.viewportReference} ref={setReferenceRef} />

      <button
        ref={buttonRef}
        className={classnames([
          styles.button,
          !referenceIsInView && styles.buttonShown,
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
  mainContentAnchor.tabIndex = -1
  mainContentAnchor.focus({ preventScroll: true })
}

// returns a dynamic speed, based on the distance from the top of the document.
function getDuration(distance: number, pixelsPerSecond: number = 2000) {
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
