export interface ComponentConfig {
  name: string;
  dependencies: string[];
}

export interface Config {
  typescript: boolean;
  componentsRootDir: string;
}
