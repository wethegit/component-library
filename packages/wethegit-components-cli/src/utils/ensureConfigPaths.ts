import { resolve } from "node:path";
import fse from "fs-extra";
import chalk from "chalk";
import ora from "ora";

import type { Config } from "../index.d";

import { logger } from "./logger";
import { DEFAULT_CONFIG } from "./consts";

const highlight = (text: string) => chalk.cyan(text);

interface EnsureConfigPathsOptions {
  cwd: string;
  config: Config;
}

export async function ensureConfigPaths({
  cwd,
  config,
}: EnsureConfigPathsOptions) {
  let { componentsRootDir } = config;

  // resolve required paths
  if (!componentsRootDir) componentsRootDir = DEFAULT_CONFIG.componentsRootDir;

  componentsRootDir = resolve(cwd, componentsRootDir);

  if (!(await fse.pathExists(componentsRootDir))) {
    const spinner = ora(
      `Components root directory ${highlight(
        componentsRootDir
      )} does not exist, creating...`
    )?.start();

    try {
      await fse.ensureDir(componentsRootDir);
      await spinner.succeed();
    } catch (e) {
      await spinner.fail(
        `Error creating ${highlight(componentsRootDir)} directory`
      );
      logger.error(e);
      process.exit(1);
    }
  }

  return {
    ...config,
    componentsRootDir,
  };
}
