import { CloseIcon } from "./close-icon"
import { PlayIcon } from "./play-icon"

export const icons: Record<string, () => JSX.Element> = {
  play: PlayIcon,
  close: CloseIcon,
}

export type IconId = keyof typeof icons
