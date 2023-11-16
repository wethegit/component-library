import type { ElementType } from "react"
import { Tag } from "@local/components/tag"
import type { TagProps } from "@local/components/tag"
import { classnames } from "@local/utilities"

import styles from "./text.module.scss"

const DEFAULT_ELEMENT = "p"

type TextAlign = "start" | "center" | "end" | "justify"

type TextVariant =
  | "title-1"
  | "title-2"
  | "title-3"
  | "title-4"
  | "title-5"
  | "title-6"
  | "body"
  | "body-smaller"
  | "body-larger"
  | "body-legal"

type TextWeight = "light" | "regular" | "medium" | "semibold" | "bold" | "black"

export type TextProps<TAs extends ElementType> = TagProps<TAs> & {
  /**
   * Specifies the inline text alignment. If omitted, inherits the parent alignment.
   */
  align?: TextAlign
  /**
   * The _visual_ hierarchy of the text. This is not the same as the semantic hierarchy.
   */
  variant?: TextVariant
  /**
   * Specifies the font weight. If omitted, inherits the parent weight.
   */
  weight?: TextWeight
  /**
   * Use default text-wrapping.
   */
  wordWrap?: boolean
  className?: string
}

export function Text<TAs extends ElementType = typeof DEFAULT_ELEMENT>({
  align,
  variant = "body",
  weight,
  wordWrap = true,
  className,
  ...props
}: TextProps<TAs>): JSX.Element {
  const { as = DEFAULT_ELEMENT, ...rest } = props

  const classes = classnames([
    styles[variant.startsWith("title-") ? "text-heading" : "text-body"],
    align && styles[`align-${align}`],
    styles[`variant-${variant}`],
    weight && styles[`weight-${weight}`],
    !wordWrap && styles["no-wrap"],
    className,
  ])

  return <Tag as={as} className={classes} {...rest} />
}
