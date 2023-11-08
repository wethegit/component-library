import { join, resolve } from "node:path";
import fse from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { glob } from "glob";

import type { Config } from "../../../index.d";
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
 * Copies components by name from the @wethegit/components package to the components directory.
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

  const { typescript } = config;

  // wait for all files to be copied
  const allFilesSpinner = ora("Copying files...").start();

  try {
    const allFilesOperations = await copyLocalDependencies({
      localDependencies: items,
      componentsPackageRoot,
      config,
      typescript,
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
  typescript,
  cwd,
}: {
  localDependencies: Registry[];
  componentsPackageRoot: string;
  config: Config;
  typescript: boolean;
  cwd: string;
}) {
  const allFilesOperations = [];

  for (let { type, name } of localDependencies) {
    const componentSpinner = ora(
      `Copying ${chalk.yellow(type)} ${chalk.cyan(name)}...`
    ).start();

    const src = resolve(
      componentsPackageRoot,
      REGISTRY_TYPE_TO_ROOT_DIR_MAP[type]
    );

    const dest = resolve(config.directories[type], name);

    if (!typescript) {
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
