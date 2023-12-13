import { classnames } from "@local/utilities"

import type { IconId } from "../icons"

import styles from "./icon.module.scss"

export interface IconProps {
  /**
   * The available icons are defined in `icons/` directory. This will vary depending on the project.
   * By default, there are `play` and `close` icons.
   */
  id: IconId
  /**
   * If not provided, `aria-hidden` will be set to `true`.
   */
  alt?: string
  className?: string
}

/**
 * To use the icons, import `IconDefs` only **ONCE** in your app and use the `Icon` component to render.
 */
export function Icon({ id, alt, className }: IconProps) {
  return (
    <svg
      role="img"
      className={classnames([styles.icon, className])}
      aria-label={alt}
      aria-hidden={alt ? "false" : "true"}
    >
      <use xlinkHref={`#icon-${id}`} />
    </svg>
  )
}
