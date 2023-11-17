import type { RegistryCategory } from "./registry-index"

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

// config directories are tied to the registry types
// helps make sure that the codebase is consistent with names and paths
type ConfigDirectories = Record<Exclude<RegistryCategory, "type">, string> & {
  type: string | false
}

export interface Config {
  directories: ConfigDirectories
}
