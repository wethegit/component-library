import { resolve } from "node:path";
import fse from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { glob } from "glob";

import type { Config } from "../../../index.d";
import COMPONENTS_INDEX from "../../../component-index";
import {
  handleError,
  logger,
  COMPONENTS_PACKAGE_COMPONENTS_DIR,
  ensureComponentsPackageIsInstalled,
} from "../../../utils";

import { transformTsToJs } from "./transformTsToJs";

interface CopyComponentsByNameOptions {
  config: Config;
  selectedComponentNames: string[];
}

/**
 * Copies components by name from the @wethegit/components package to the components directory.
 */
export async function copyComponentsByName({
  config,
  selectedComponentNames,
}: CopyComponentsByNameOptions) {
  if (!selectedComponentNames.length) {
    logger.info(`No components selected, exiting...`);

    return;
  }

  const componentsPackageRoot = ensureComponentsPackageIsInstalled();

  const { componentsRootDir, typescript } = config;

  // create components dir if it doesnt exist
  if (!(await fse.pathExists(componentsRootDir))) {
    const spinner = ora(
      `Components root directory ${chalk.cyan(
        componentsRootDir
      )} does not exist, creating...`
    )?.start();

    try {
      await fse.ensureDir(componentsRootDir);

      await spinner.succeed();
    } catch (error) {
      handleError({
        error,
        spinner,
        exit: true,
        spinnerText: `Error creating ${chalk.cyan(
          componentsRootDir
        )} directory`,
      });
    }
  }

  const allFilesSpinner = ora("Copying files...").start();

  const allFilesPromise = [];

  for (let componentName of selectedComponentNames) {
    const componentSpinner = ora(
      `Copying ${chalk.cyan(componentName)}...`
    ).start();

    const { name } = COMPONENTS_INDEX[componentName];

    const src = resolve(
      componentsPackageRoot,
      COMPONENTS_PACKAGE_COMPONENTS_DIR,
      name
    );
    const dest = resolve(componentsRootDir, name);

    if (!typescript) {
      const files = await glob("*", { cwd: src, absolute: true });

      const filePromises = transformTsToJs({
        files,
        destDir: dest,
      });

      allFilesPromise.push(
        filePromises
          .then(() => componentSpinner.succeed())
          .catch((error) => handleError({ error, spinner: componentSpinner }))
      );
    } else {
      allFilesPromise.push(
        fse
          .copy(src, dest)
          .then(() => componentSpinner.succeed())
          .catch((error) => handleError({ error, spinner: componentSpinner }))
      );
    }
  }

  // wait for all files to be copied
  try {
    await Promise.all(allFilesPromise);

    await allFilesSpinner.succeed();
  } catch (error) {
    handleError({ error, spinner: allFilesSpinner, exit: true });
  }
}
