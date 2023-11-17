import { useUserPrefs } from "@wethegit/react-hooks"

export interface UseReducedMotionReturn {
  prefersReducedMotion: boolean
  togglePrefersReducedMotion: () => void
}

export function useReducedMotion(): UseReducedMotionReturn {
  const { prefersReducedMotion, togglePrefersReducedMotion } = useUserPrefs()

  return {
    prefersReducedMotion,
    togglePrefersReducedMotion,
  }
}
