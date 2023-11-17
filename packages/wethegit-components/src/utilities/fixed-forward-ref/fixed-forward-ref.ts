import { forwardRef } from "react"
import type { Ref, ReactNode, RefAttributes } from "react"

type FixedForwardRef = <T, P = object>(
  render: (props: P, ref: Ref<T>) => ReactNode
) => (props: P & RefAttributes<T>) => JSX.Element

/**
 * This is a workaround for a bug with React.forwardRef where the ref type is not inferred correctly.
 * Ignore if not using TypeScript.
 */
export const fixedForwardRef = forwardRef as FixedForwardRef
