export type ClassnamesProps = boolean | string | undefined | null | ClassnamesProps[]

export function classnames(classes: ClassnamesProps): string {
  if (!classes || typeof classes === "boolean") return ""
  if (!Array.isArray(classes)) return classes

  return classes
    .flat()
    .filter((c) => typeof c === "string")
    .join(" ")
}
