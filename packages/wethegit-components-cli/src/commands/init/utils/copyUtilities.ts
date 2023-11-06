import { resolve } from "node:path";
import ora from "ora";
import fse from "fs-extra";
import chalk from "chalk";

import type { Config } from "../../../index.d";
import {
  COMPONENTS_PACKAGE_UTILITIES_DIR,
  ensureComponentsPackageIsInstalled,
  handleError,
} from "../../../utils";

export interface CopyUtilitiesOptions {
  config: Config;
}

export async function copyUtilities({ config }: CopyUtilitiesOptions) {
  if (!config.utilitiesRootDir) return;

  const componentsPackageRoot = ensureComponentsPackageIsInstalled();

  const { utilitiesRootDir } = config;

  // create utilities dir if it doesnt exist
  if (!(await fse.pathExists(utilitiesRootDir))) {
    const spinner = ora(
      `Utilities root directory ${chalk.cyan(
        utilitiesRootDir
      )} does not exist, creating...`
    )?.start();

    try {
      await fse.ensureDir(utilitiesRootDir);

      await spinner.succeed();
    } catch (error) {
      handleError({
        error,
        spinner,
        exit: true,
        spinnerText: `Error creating ${chalk.cyan(utilitiesRootDir)} directory`,
      });
    }
  }

  const spinner = ora("Copying utilities...").start();

  try {
    const src = resolve(
      componentsPackageRoot,
      COMPONENTS_PACKAGE_UTILITIES_DIR
    );

    await fse.copy(src, utilitiesRootDir);

    spinner.succeed();
  } catch (error) {
    handleError({
      error,
      spinner,
      exit: true,
    });
  }
}
