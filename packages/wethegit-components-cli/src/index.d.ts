import type { RegistryType } from "./registry-index";

// config directories are tied to the registry types
// helps make sure that the codebase is consistent with names and paths
export type ConfigDirectories = Record<RegistryType, string>;

export interface Config {
  typescript: boolean;
  directories: ConfigDirectories;
}
