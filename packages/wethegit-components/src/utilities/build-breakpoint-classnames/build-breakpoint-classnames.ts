import type { ClassnamesProps } from "../classnames"

export function buildBreakpointClassnames<T extends string | number | boolean>(
  prop: T | Partial<Omit<Breakpoints<T>, "sm">> | undefined,
  styles: Record<string, string>,
  styleName: string
): ClassnamesProps {
  const allClassnames: ClassnamesProps = []

  if (typeof prop === "object") {
    const { md, lg, xl, xxl } = prop

    if (md) allClassnames.push(styles[`${styleName}-${md}`])
    if (lg) allClassnames.push(styles[`${styleName}-lg-${lg}`])
    if (xl) allClassnames.push(styles[`${styleName}-xl-${xl}`])
    if (xxl) allClassnames.push(styles[`${styleName}-xxl-${xxl}`])
  } else if (prop !== undefined) {
    allClassnames.push(styles[`${styleName}-${prop}`])
  }

  return allClassnames
}
