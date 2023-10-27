export interface ComponentConfig {
  /** Should be the same name as the component's directory */
  name: string;
  /** A glob pattern to match files to copy from the component directory to the project
   * @default "*"
   */
  files?: string;
  /** List of local components */
  localDependencies?: string[];
  /** List of node packages */
  dependencies?: string[];
  /** Should this component appear as an option when running the add command. Default is true  */
  dontShowOnPrompt?: boolean;
}

export type ComponentsIndex = {
  [key: string]: ComponentConfig;
};

const COMPONENTS_INDEX: ComponentsIndex = {
  button: {
    name: "button",
    localDependencies: ["button-dep"],
  },
  "button-dep": {
    name: "button-dep",
    dependencies: ["classnames"],
    dontShowOnPrompt: true,
  },
  row: {
    name: "row",
    dependencies: ["classnames"],
  },
};

export default COMPONENTS_INDEX;
