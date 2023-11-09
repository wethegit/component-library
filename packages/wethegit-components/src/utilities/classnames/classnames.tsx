export type ClassnamesProps = string | undefined | null | ClassnamesProps[];

export function classnames(classes: ClassnamesProps): string {
  if (!classes) return "";
  if (!Array.isArray(classes)) return classes;

  return classes
    .flat()
    .filter((c) => typeof c === "string")
    .join(" ");
}
