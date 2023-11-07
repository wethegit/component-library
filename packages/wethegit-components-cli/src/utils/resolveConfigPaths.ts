import { resolve } from "node:path";

import type { Config } from "../index.d";

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
  let { componentsRootDir, stylesRootDir, utilitiesRootDir } = config;

  // resolve required paths
  if (!utilitiesRootDir) utilitiesRootDir = DEFAULT_CONFIG.utilitiesRootDir;

  if (!componentsRootDir) componentsRootDir = DEFAULT_CONFIG.componentsRootDir;

  if (!stylesRootDir) stylesRootDir = DEFAULT_CONFIG.stylesRootDir;

  componentsRootDir = resolve(cwd, componentsRootDir);
  stylesRootDir = resolve(cwd, stylesRootDir);
  utilitiesRootDir = resolve(cwd, utilitiesRootDir);

  return {
    ...config,
    utilitiesRootDir,
    componentsRootDir,
    stylesRootDir,
  };
}
