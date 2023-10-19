export type ComponentDependency = string;

export interface ComponentConfig {
  /** Should be the same name as the component directory */
  name: string;
  dependencies?: ComponentDependency[];
  /** A glob pattern to match files to copy from the component to the project
   * @default "*"
   */
  files?: string;
}

export type ComponentsIndex = {
  [key: string]: ComponentConfig;
};

export interface Config {
  typescript: boolean;
  componentsRootDir: string;
}
