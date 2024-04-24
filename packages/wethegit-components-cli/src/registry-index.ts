import chalk from "chalk"

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

const COLOR: Registry = {
  name: "color",
  category: "utility",
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/utilities-color--overview",
}

const SPACING: Registry = {
  name: "spacing",
  category: "utility",
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/utilities-spacing--overview",
}

const VISIBILITY: Registry = {
  name: "visibility",
  category: "utility",
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/utilities-visibility--overview",
}

/* COMPONENTS */
const TAG: Registry = {
  name: "tag",
  category: "component",
}

const TEXT: Registry = {
  name: "text",
  category: "component",
  localDependencies: [TAG, CLASSNAMES, FIXED_FORWARD_REF],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-text-readme--overview",
  postInstallMessages: [
    `The ${chalk.bold("Text")} component requires a ${chalk.italic("CSS")} file to work properly. Add the following line to your global styles:`,
    '@import "@local/components/text/styles/text.scss";',
  ],
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
    "https://wethegit.github.io/component-library/?path=/docs/components-grid-layout-readme--overview",
  postInstallMessages: [
    `The ${chalk.bold("grid")} requires a CSS file to work properly. Add the following line to your global styles:`,
    '@import "@local/components/grid-layout/styles/grid-layout.scss";',
  ],
}

const IMAGE_GROUP: Registry = {
  name: "image-group",
  category: "component",
  localDependencies: [CLASSNAMES, FIXED_FORWARD_REF, TAG],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-image-group-readme--overview",
}

const VISUALLY_HIDDEN: Registry = {
  name: "visually-hidden",
  category: "component",
  localDependencies: [TAG, CLASSNAMES],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-visually-hidden-readme--overview",
}

const NAVIGATION: Registry = {
  name: "navigation",
  category: "component",
  localDependencies: [FLEX, CLASSNAMES, VISUALLY_HIDDEN, FIXED_FORWARD_REF],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-navigation-readme--overview",
}

const ICON: Registry = {
  name: "icon",
  category: "component",
  localDependencies: [CLASSNAMES],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-icon-readme--overview",
}

const ACCORDION: Registry = {
  name: "Accordion",
  category: "component",
  localDependencies: [ICON, TEXT],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-accordion-readme--overview",
}

const MODAL: Registry = {
  name: "modal",
  category: "component",
  localDependencies: [CLASSNAMES],
  dependencies: ["@wethegit/react-modal", "@wethegit/react-hooks"],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-modal-readme--overview",
  postInstallMessages: [
    `The Modal requires the styles from ${chalk.italic("@wethegit/react-modal")} to work.`,
    `It should be imported in your main ${chalk.bold("js")} file. In NextJS that would be the ${chalk.italic("_app.js")} file:`,
    'import "@wethegit/react-modal/style.css";',
  ],
}

const IN_VIEW: Registry = {
  name: "in-view",
  category: "component",
  localDependencies: [CLASSNAMES, FIXED_FORWARD_REF, TAG],
  dependencies: ["@wethegit/react-hooks"],
}

const VISUALLY_HIDDEN_LINKS: Registry = {
  name: "visually-hidden-links",
  category: "component",
  localDependencies: [CLASSNAMES, VISUALLY_HIDDEN],
}

const BREAKPOINT_SNIPE: Registry = {
  name: "breakpoint-snipe",
  category: "component",
  localDependencies: [CLASSNAMES],
}

const BACK_TO_TOP: Registry = {
  name: "back-to-top",
  category: "component",
  localDependencies: [CLASSNAMES],
  dependencies: ["@wethegit/react-hooks"],
  docsUrl:
    "https://wethegit.github.io/component-library/?path=/docs/components-back-to-top-readme--overview",
}

/* INDEX */
export const REGISTRY_INDEX: RegistryIndex = {
  [ACCORDION.name]: ACCORDION,
  [BACK_TO_TOP.name]: BACK_TO_TOP,
  [BREAKPOINT_SNIPE.name]: BREAKPOINT_SNIPE,
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
  [VISUALLY_HIDDEN_LINKS.name]: VISUALLY_HIDDEN_LINKS,

  [CLASSNAMES.name]: CLASSNAMES,
  [COLOR.name]: COLOR,
  [SPACING.name]: SPACING,
  [VISIBILITY.name]: VISIBILITY,
}
/* END REGISTRY INDEX */
