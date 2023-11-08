import type { RegistryType } from "./registry-index";

export type ConfigDirectories = Record<RegistryType, string>;

export interface Config {
  typescript: boolean;
  directories: ConfigDirectories;
}
