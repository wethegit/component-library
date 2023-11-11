import type { ComponentPropsWithRef, ElementType, ForwardedRef } from "react"

import { fixedForwardRef } from "@local/utilities"

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never

export type TagProps<TAs extends ElementType> = {
  as?: TAs
} & DistributiveOmit<ComponentPropsWithRef<ElementType extends TAs ? "div" : TAs>, "as">

function UnwrappedTag<TAs extends ElementType>(
  props: TagProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const { as: Comp = "div", ...rest } = props
  return <Comp {...rest} ref={ref} />
}

/*
  Taken from the example by the TS wizard Matt Pocock
  https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.solution.tsx
*/

/**
 * This is a generic component that can be used to create any HTML tag and infer the type of the props.
 * This should be used by other components that accept an `as` prop.
 *
 * @example Usage for components
 * export type BadgeProps<TAs extends React.ElementType> = TagProps<TAs> & { prop: here };
 * export function Badge<TAs extends ElementType = 'default-element'>({ children, ...rest }: BadgeProps<TAs>) {
 *   const { as = 'default-element', ...props } = rest;
 *   return <Tag as={a} ...props>{children}</Tag>;
 * }
 *
 * @example Regular usage
 * <Tag as="a" href="https://www.google.com">Google</Tag>
 */
export const Tag = fixedForwardRef(UnwrappedTag)
