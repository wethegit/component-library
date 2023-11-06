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
  let { componentsRootDir, stylesRootDir, rootDir, utilitiesRootDir } = config;

  // resolve required paths
  if (!rootDir) rootDir = DEFAULT_CONFIG.rootDir;

  if (!utilitiesRootDir) utilitiesRootDir = DEFAULT_CONFIG.utilitiesRootDir;

  if (!componentsRootDir) componentsRootDir = DEFAULT_CONFIG.componentsRootDir;

  if (!stylesRootDir) stylesRootDir = DEFAULT_CONFIG.stylesRootDir;

  rootDir = resolve(cwd, rootDir);
  componentsRootDir = resolve(rootDir, componentsRootDir);
  stylesRootDir = resolve(rootDir, stylesRootDir);
  utilitiesRootDir = resolve(rootDir, utilitiesRootDir);

  return {
    ...config,
    rootDir,
    utilitiesRootDir,
    componentsRootDir,
    stylesRootDir,
  };
}
