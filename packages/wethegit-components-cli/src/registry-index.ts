export type RegistryCategory = "component" | "utility" | "style" | "type"

export interface Registry {
  /** Should be the same name as the item's directory */
  name: string
  /** The type of item. If empty, component */
  category: RegistryCategory
  /** A glob pattern to match files to copy from the item directory to the project
   * @default "*"
   */
  files?: string
  /** List of local dependencies. Every listed dependency must also be part of the registry index. */
  localDependencies?: Registry[]
  /** List of node packages */
  dependencies?: string[]
  /** Should this item appear as an option when running the add command. Default is true  */
  dontShowOnPrompt?: boolean
}

export type RegistryIndex = Record<string, Registry>

/* REGISTRY INDEX */
/* UTILITIES */
const FIXED_FORWARD_REF: Registry = {
  name: "fixed-forward-ref",
  category: "utility",
  dontShowOnPrompt: true,
}

const BUILD_BREAKPOINT_CLASSNAMES: Registry = {
  name: "build-breakpoint-classnames",
  category: "utility",
  dontShowOnPrompt: true,
}

const CLASSNAMES: Registry = {
  name: "classnames",
  category: "utility",
  dontShowOnPrompt: true,
}

/* TYPES */
const BREAKPOINTS_TYPE: Registry = {
  name: "breakpoints",
  category: "type",
  dontShowOnPrompt: true,
}

/* COMPONENTS */
const TAG: Registry = {
  name: "tag",
  category: "component",
}

const FLEX: Registry = {
  name: "flex",
  category: "component",
  localDependencies: [TAG, CLASSNAMES, FIXED_FORWARD_REF, BUILD_BREAKPOINT_CLASSNAMES],
}

const GRID_LAYOUT: Registry = {
  name: "grid-layout",
  category: "component",
  localDependencies: [FLEX],
}

/* INDEX */
export const REGISTRY_INDEX: RegistryIndex = {
  [FLEX.name]: FLEX,
  [GRID_LAYOUT.name]: GRID_LAYOUT,
  [TAG.name]: TAG,
  [FIXED_FORWARD_REF.name]: FIXED_FORWARD_REF,
  [BREAKPOINTS_TYPE.name]: BREAKPOINTS_TYPE,
}
/* END REGISTRY INDEX */
