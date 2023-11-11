import { join, resolve } from "node:path";
import fse from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { glob } from "glob";

import type { Config } from "../../../global";
import type { Registry } from "../../../registry-index";

import {
  handleError,
  logger,
  ensureComponentsPackageIsInstalled,
  REGISTRY_TYPE_TO_ROOT_DIR_MAP,
} from "../../../utils";

import { transformTsToJs } from "./transformTsToJs";

interface CopyComponentsByNameOptions {
  cwd: string;
  config: Config;
  items: Registry[];
}

/**
 * Copies elements of the registry from the @wethegit/components package to destination set in the config.
 */
export async function copyRegistryItems({
  cwd,
  config,
  items,
}: CopyComponentsByNameOptions) {
  if (!items.length) {
    logger.info(`No items selected, exiting...`);

    return;
  }

  const componentsPackageRoot = ensureComponentsPackageIsInstalled();

  // wait for all files to be copied
  const allFilesSpinner = ora("Copying files...").start();

  try {
    const allFilesOperations = await copyLocalDependencies({
      localDependencies: items,
      componentsPackageRoot,
      config,
      cwd,
    });

    await Promise.all(allFilesOperations);

    await allFilesSpinner.succeed();
  } catch (error) {
    handleError({ error, spinner: allFilesSpinner, exit: true });
  }
}

/**
 * Copies components by name from the @wethegit/components package to the components directory
 */
async function copyLocalDependencies({
  localDependencies,
  componentsPackageRoot,
  config,
  cwd,
}: {
  localDependencies: Registry[];
  componentsPackageRoot: string;
  config: Config;
  cwd: string;
}) {
  const allFilesOperations = [];
  const useTypescript = !!config.directories.type;

  for (let { category, name } of localDependencies) {
    if (!useTypescript && category === "type") continue;

    const componentSpinner = ora(
      `Copying ${chalk.yellow(category)} ${chalk.cyan(name)}...`
    ).start();

    const src = resolve(
      componentsPackageRoot,
      REGISTRY_TYPE_TO_ROOT_DIR_MAP[category]
    );

    const rootDestDir = config.directories[category] as string;
    const dest = resolve(rootDestDir, name);

    if (!useTypescript) {
      const files = await glob(join(name, "**/*.*"), {
        cwd: src,
        absolute: true,
      });

      const filePromises = transformTsToJs({
        cwd,
        files,
        srcDir: src,
        destDir: dest,
      });

      allFilesOperations.push(
        filePromises
          .then(() => componentSpinner.succeed())
          .catch((error) => handleError({ error, spinner: componentSpinner }))
      );
    } else {
      allFilesOperations.push(
        fse
          .copy(resolve(src, name), dest)
          .then(() => componentSpinner.succeed())
          .catch((error) => handleError({ error, spinner: componentSpinner }))
      );
    }
  }

  return allFilesOperations;
}
