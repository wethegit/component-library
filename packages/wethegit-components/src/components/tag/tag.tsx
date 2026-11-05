import type { ComponentPropsWithRef, ElementType } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is a utility type
type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never

export type TagProps<TAs extends ElementType> = {
  /**
   * The HTMLElement to render
   */
  as?: TAs
} & DistributiveOmit<ComponentPropsWithRef<ElementType extends TAs ? "div" : TAs>, "as">

/**
 * This is a generic component that can be used to create any HTML tag and infer the type of the props.
 * This should be used by __other components__ that accept an `as` prop.
 *
 * ✨ Only go through these steps if your component default tag isn't a `div`
 *
 * ```tsx
 * import { Tag } from "@locals/components"
 * import type { TagProps } from "@locals/components"
 *
 * const DEFAULT_TAG = "article" as const;
 *
 * export type GenericSectionProps<TAs extends React.ElementType> = TagProps<TAs> & {
 *   myprop: "here"
 * };
 *
 * export function GenericSection<TAs extends ElementType = typeof DEFAULT_TAG>({
 *   className,
 *   myprop,
 *   ...props
 * }: GenericSectionProps<TAs>) {
 *   const { as = DEFAULT_TAG, ...rest } = props
 *
 *   return <Tag as={as} {...rest} />
 * })
 * ```
 */
export function Tag<TAs extends ElementType>(props: TagProps<TAs>) {
  const { as: Comp = "div", ...rest } = props
  return <Comp {...rest} />
}
