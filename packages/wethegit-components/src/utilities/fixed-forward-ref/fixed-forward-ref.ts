import { forwardRef } from "react";

type FixedForwardRef = <T, P = object>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => JSX.Element;

export const fixedForwardRef = forwardRef as FixedForwardRef;
