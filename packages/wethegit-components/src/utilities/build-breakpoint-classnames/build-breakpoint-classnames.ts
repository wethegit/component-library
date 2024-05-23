import type { ClassnamesProps } from "../classnames"

export function buildBreakpointClassnames<T extends string | number | boolean>(
  prop: T | Partial<Breakpoints<T>> | undefined,
  styles: Record<string, string>,
  styleName: string
): ClassnamesProps {
  const allClassnames: ClassnamesProps = []

  if (typeof prop === "object") {
    const { sm, md, lg, xl, xxl } = prop

    if (sm) allClassnames.push(styles[`${styleName}-sm-${sm}`])
    if (md) allClassnames.push(styles[`${styleName}-md-${md}`])
    if (lg) allClassnames.push(styles[`${styleName}-lg-${lg}`])
    if (xl) allClassnames.push(styles[`${styleName}-xl-${xl}`])
    if (xxl) allClassnames.push(styles[`${styleName}-xxl-${xxl}`])
  } else if (prop !== undefined) {
    allClassnames.push(styles[`${styleName}-${prop}`])
  }

  return allClassnames
}
