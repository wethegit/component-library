import type { ComponentPropsWithRef, ElementType, ForwardedRef } from "react";
import { fixedForwardRef } from "@local/utilities";

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

export type TagProps<TAs extends ElementType> = {
  as?: TAs;
} & DistributiveOmit<
  ComponentPropsWithRef<ElementType extends TAs ? "div" : TAs>,
  "as"
>;

/**
 * This is generic component that can be used to create any HTML tag and infer the type of the props.
 * Taken from the example by the TS wizard Matt Pocock
 * https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.solution.tsx
 * This should be used by other components that accept an `as` prop.
 *
 * @example Usage for components
 * export type BadgeProps<TAs extends ElementType> = TagProps<TAs>;
 * export function Badge<TAs extends ElementType>({ children }: BadgeProps<TAs>) {
 *   return <Tag className="">{children}</Tag>;
 * }
 *
 * @example Usage for elements
 * <Tag as="a" href="https://www.google.com">Google</Tag>
 */
function UnwrappedTag<TAs extends ElementType>(
  props: TagProps<TAs>,
  ref: ForwardedRef<unknown>
): JSX.Element {
  const { as: Comp = "div", ...rest } = props;
  return <Comp {...rest} ref={ref} />;
}

export const Tag = fixedForwardRef(UnwrappedTag);
