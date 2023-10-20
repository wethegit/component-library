import { resolve } from "node:path";

import type { Config } from "../index.d";

import { DEFAULT_CONFIG } from "./consts";

interface ResolveConfigPathsOptions {
  cwd: string;
  config: Config;
}

export async function resolveConfigPaths({
  cwd,
  config,
}: ResolveConfigPathsOptions) {
  let { componentsRootDir } = config;

  // resolve required paths
  if (!componentsRootDir) componentsRootDir = DEFAULT_CONFIG.componentsRootDir;

  componentsRootDir = resolve(cwd, componentsRootDir);

  return {
    ...config,
    componentsRootDir,
  };
}
