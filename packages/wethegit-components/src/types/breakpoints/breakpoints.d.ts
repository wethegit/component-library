type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl";

type Breakpoints<T> = Record<Breakpoint, T>;
