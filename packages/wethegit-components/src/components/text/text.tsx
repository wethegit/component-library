import { Tag } from "@local/components/tag"
import type { TagProps } from "@local/components/tag"
import { buildBreakpointClassnames, classnames } from "@local/utilities"

import styles from "./text.module.scss"

const DEFAULT_ELEMENT = "p"

type TextAlign = "start" | "center" | "end" | "justify"
type TextAlignBreakpoints = Partial<Breakpoints<TextAlign>>

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

type TextWrap = "wrap" | "nowrap" | "balance" | "pretty"

export type TextProps<TAs extends React.ElementType> = TagProps<TAs> & {
  /**
   * Specifies the inline text alignment. If omitted, inherits the parent alignment.
   */
  align?: TextAlign | TextAlignBreakpoints
  /**
   * The _visual_ hierarchy of the text. This is not the same as the semantic hierarchy.
   */
  variant?: TextVariant
  /**
   * Specifies the font weight. If omitted, inherits the parent weight.
   */
  weight?: TextWeight
  /**
   * Specify the text-wrapping algorithm. If omitted, the base .text class decalres it as "pretty".
   */
  wrap?: TextWrap
  className?: string
}

export function Text<TAs extends React.ElementType = typeof DEFAULT_ELEMENT>({
  align,
  variant = "body",
  weight,
  wrap,
  className,
  ...props
}: TextProps<TAs>): JSX.Element {
  const { as = DEFAULT_ELEMENT, ...rest } = props

  const classes = classnames([
    styles.text,
    styles[variant.startsWith("title-") ? "textHeading" : "textBody"],
    align && buildBreakpointClassnames<TextAlign>(align, styles, "align"),
    styles[`variant-${variant}`],
    weight && styles[`weight-${weight}`],
    wrap && styles[`wrap-${wrap}`],
    className,
  ])

  return <Tag as={as} className={classes} {...rest} />
}
