export interface ComponentConfig {
  /** Should be the same name as the component's directory */
  name: string;
  /** A glob pattern to match files to copy from the component directory to the project
   * @default "*"
   */
  files?: string;
}

export type ComponentsIndex = {
  [key: string]: ComponentConfig;
};

const COMPONENTS_INDEX: ComponentsIndex = {
  button: {
    name: "button",
  },
};

export default COMPONENTS_INDEX;
