import { forwardRef } from "react"
import type { Ref, ReactNode, RefAttributes } from "react"

type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactNode
) => (props: P & RefAttributes<T>) => JSX.Element

export const fixedForwardRef = forwardRef as FixedForwardRef
