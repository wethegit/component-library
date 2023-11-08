type ClassNameValue = string | number | boolean | undefined | null;

type Argument = string | ClassNameValue[];

export function classnames(classes: Argument): string {
  if (typeof classes === "string") return classes;

  return classes
    .flat()
    .filter((c) => typeof c === "string")
    .join(" ");
}
