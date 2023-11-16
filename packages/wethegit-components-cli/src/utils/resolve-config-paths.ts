import { resolve } from "node:path"

import type { Config, Entries } from "../global"

interface ResolveConfigPathsOptions {
  cwd: string
  config: Config
}

type ConfigDirectories = Config["directories"]

/**
 * Resolves the paths in the config with absolute paths so we can use them internally.
 */
export function resolveConfigPaths({ cwd, config }: ResolveConfigPathsOptions): Config {
  const resolvedDirectories: ConfigDirectories = { ...config.directories }

  for (const [key, value] of Object.entries(
    config.directories
  ) as Entries<ConfigDirectories>) {
    if (!value) continue

    resolvedDirectories[key] = resolve(cwd, value)
  }

  return {
    ...config,
    directories: resolvedDirectories,
  }
}
