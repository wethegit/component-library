import { useEffect, useMemo, useState } from "react"

// *Important: These settings need to remain in sync with those defined in `src/styles/breakpoints/_breakpoints-variables.scss`.
const breakpointSettings = {
  sm: "screen and (max-width: 639px)",
  md: "screen and (min-width: 640px) and (max-width: 1023px)",
  lg: "screen and (min-width: 1024px) and (max-width: 1143px)",
  xl: "screen and (min-width: 1144px) and (max-width: 1439px)",
  xxl: "screen and (min-width: 1440px)",
}

const BREAKPOINTS: [Breakpoint, string][] = Object.entries(breakpointSettings).map(
  ([key, val]) => [key as Breakpoint, val.replaceAll('"', "")]
)

export function useBreakpoints() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>("sm")

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>

    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setBreakpoint(BREAKPOINTS.find((bp) => window.matchMedia(bp[1]).matches)?.[0])
      }, 200)
    }

    onResize()

    window.addEventListener("resize", onResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const breakpointData = useMemo(() => {
    let xxlUp, xlUp, lgUp, mdUp

    if (breakpoint) {
      xxlUp = breakpoint === "xxl"
      xlUp = xxlUp || breakpoint === "xl"
      lgUp = xlUp || breakpoint === "lg"
      mdUp = lgUp || breakpoint === "md"
    }

    return {
      breakpoint,
      mdUp,
      lgUp,
      xlUp,
      xxlUp,
    }
  }, [breakpoint])

  return breakpointData
}
