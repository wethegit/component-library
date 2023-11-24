export type RegistryCategory = "component" | "utility" | "style" | "type" | "hook"

export interface Registry {
  /** Should be the same name as the item's directory */
  name: string
  /** The type of item. If empty, component */
  category: RegistryCategory
  /** A glob pattern to match files to copy from the item directory to the project
   * @defaultValue "*"
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
/* TYPES */
const BREAKPOINTS_TYPE: Registry = {
  name: "breakpoints",
  category: "type",
  dontShowOnPrompt: true,
}

/* UTILITIES */
const FIXED_FORWARD_REF: Registry = {
  name: "fixed-forward-ref",
  category: "utility",
}

const BUILD_BREAKPOINT_CLASSNAMES: Registry = {
  name: "build-breakpoint-classnames",
  category: "utility",
  localDependencies: [BREAKPOINTS_TYPE],
}

const CLASSNAMES: Registry = {
  name: "classnames",
  category: "utility",
}

/* COMPONENTS */
const TAG: Registry = {
  name: "tag",
  category: "component",
}

const TEXT: Registry = {
  name: "text",
  category: "component",
  localDependencies: [TAG, CLASSNAMES],
}

const FLEX: Registry = {
  name: "flex",
  category: "component",
  localDependencies: [
    TAG,
    CLASSNAMES,
    FIXED_FORWARD_REF,
    BUILD_BREAKPOINT_CLASSNAMES,
    BREAKPOINTS_TYPE,
  ],
}

const GRID_LAYOUT: Registry = {
  name: "grid-layout",
  category: "component",
  localDependencies: [FLEX],
}

const IMAGE_GROUP: Registry = {
  name: "image-group",
  category: "component",
  localDependencies: [CLASSNAMES, FIXED_FORWARD_REF, TAG],
}

const VISUALLY_HIDDEN: Registry = {
  name: "visually-hidden",
  category: "component",
  localDependencies: [TAG, CLASSNAMES],
}

const NAVIGATION: Registry = {
  name: "navigation",
  category: "component",
  localDependencies: [FLEX, CLASSNAMES, VISUALLY_HIDDEN, FIXED_FORWARD_REF],
}

const ICON: Registry = {
  name: "icon",
  category: "component",
  localDependencies: [CLASSNAMES],
}

const MODAL: Registry = {
  name: "modal",
  category: "component",
  localDependencies: [CLASSNAMES],
  dependencies: ["@wethegit/react-modal@beta-2", "@wethegit/react-hooks"],
}

const USE_ANIMATE_PRESENCE: Registry = {
  name: "use-animate-presence",
  category: "hook",
  dependencies: ["@wethegit/react-hooks"],
}

/* INDEX */
export const REGISTRY_INDEX: RegistryIndex = {
  [FLEX.name]: FLEX,
  [GRID_LAYOUT.name]: GRID_LAYOUT,
  [IMAGE_GROUP.name]: IMAGE_GROUP,
  [TAG.name]: TAG,
  [TEXT.name]: TEXT,
  [VISUALLY_HIDDEN.name]: VISUALLY_HIDDEN,
  [NAVIGATION.name]: NAVIGATION,
  [ICON.name]: ICON,
  [MODAL.name]: MODAL,
  [USE_ANIMATE_PRESENCE.name]: USE_ANIMATE_PRESENCE,
}
/* END REGISTRY INDEX */
