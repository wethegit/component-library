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
  /** Link to the Storybook documentation */
  docsUrl?: string
  /** Array of messages to be displayed after adding the component */
  postInstallMessages?: string[]
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

const ANIMATION: Registry = {
  name: "animation",
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
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-text-readme--docs",
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
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-grid-layout-readme--docs",
  postInstallMessages: [
    "The grid requires a CSS file to work properly. Add the following line to your global styles:",
    '@import "@local/components/grid-layout/styles/grid-layout.scss";',
  ],
}

const IMAGE_GROUP: Registry = {
  name: "image-group",
  category: "component",
  localDependencies: [CLASSNAMES, FIXED_FORWARD_REF, TAG],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-image-group-readme--docs",
}

const VISUALLY_HIDDEN: Registry = {
  name: "visually-hidden",
  category: "component",
  localDependencies: [TAG, CLASSNAMES],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-visually-hidden-readme--docs",
}

const NAVIGATION: Registry = {
  name: "navigation",
  category: "component",
  localDependencies: [FLEX, CLASSNAMES, VISUALLY_HIDDEN, FIXED_FORWARD_REF],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-navigation-readme--docs",
}

const ICON: Registry = {
  name: "icon",
  category: "component",
  localDependencies: [CLASSNAMES],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-icon-readme--docs",
}

const MODAL: Registry = {
  name: "modal",
  category: "component",
  localDependencies: [CLASSNAMES],
  dependencies: ["@wethegit/react-modal", "@wethegit/react-hooks"],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-modal-readme--docs",
}

const IN_VIEW: Registry = {
  name: "in-view",
  category: "component",
  localDependencies: [ANIMATION, CLASSNAMES, FIXED_FORWARD_REF, TAG],
  dependencies: ["@wethegit/react-hooks"],
}

/* INDEX */
export const REGISTRY_INDEX: RegistryIndex = {
  [FLEX.name]: FLEX,
  [GRID_LAYOUT.name]: GRID_LAYOUT,
  [ICON.name]: ICON,
  [IMAGE_GROUP.name]: IMAGE_GROUP,
  [IN_VIEW.name]: IN_VIEW,
  [MODAL.name]: MODAL,
  [NAVIGATION.name]: NAVIGATION,
  [TAG.name]: TAG,
  [TEXT.name]: TEXT,
  [VISUALLY_HIDDEN.name]: VISUALLY_HIDDEN,
}
/* END REGISTRY INDEX */
