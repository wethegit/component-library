import { resolve } from "node:path";

import type { Config, ConfigDirectories } from "../index.d";

import { DEFAULT_CONFIG } from "./consts";

interface ResolveConfigPathsOptions {
  cwd: string;
  config: Config;
}

/**
 * Resolves the paths in the config with absolute paths so we can use them internally.
 */
export async function resolveConfigPaths({
  cwd,
  config,
}: ResolveConfigPathsOptions) {
  const resolvedDirectories: ConfigDirectories = {
    ...DEFAULT_CONFIG.directories,
  };

  for (let [key, value] of Object.entries(config.directories) as [
    keyof ConfigDirectories,
    string,
  ][]) {
    resolvedDirectories[key] = resolve(
      cwd,
      value || DEFAULT_CONFIG.directories[key]
    );
  }

  return {
    ...config,
    directories: resolvedDirectories,
  };
}
