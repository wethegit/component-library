import { classnames } from "@local/utilities"

import styles from "./icon.module.scss"

export interface IconProps {
  /**
   * A unique identifier for the icon, e.g. `play`. Same as the `id` attribute of the `<symbol>`.
   */
  id: string
  /**
   * If not provided, `aria-hidden` will be set to `true`.
   */
  alt?: string
  className?: string
}

/**
 * To use the icons, import `IconDefs` only **ONCE** in your app, add your icons using `IconSymbol` as children of `IconDefs` and then use the `Icon` component to render them.
 */
export function Icon({ id, alt, className, ...props }: IconProps) {
  return (
    <svg
      role="img"
      className={classnames([styles.icon, className])}
      aria-label={alt}
      aria-hidden={alt ? "false" : "true"}
      {...props}
    >
      <use xlinkHref={`#wtc-icon-${id}`} />
    </svg>
  )
}
