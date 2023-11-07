import { resolve } from "node:path";
import fse from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { glob } from "glob";

import type { Config } from "../../../index.d";
import { REGISTRY_INDEX } from "../../../registry-index";
import type { Registry } from "../../../registry-index";

import {
  handleError,
  logger,
  ensureComponentsPackageIsInstalled,
  installDependencies,
  REGISTRY_TYPE_TO_ROOT_DIR_MAP,
} from "../../../utils";

import { transformTsToJs } from "./transformTsToJs";

interface CopyComponentsByNameOptions {
  cwd: string;
  config: Config;
  selectedItems: (keyof Registry)[];
}

/**
 * Copies components by name from the @wethegit/components package to the components directory.
 */
export async function copyRegistryItems({
  cwd,
  config,
  selectedItems,
}: CopyComponentsByNameOptions) {
  if (!selectedItems.length) {
    logger.info(`No items selected, exiting...`);

    return;
  }

  const componentsPackageRoot = ensureComponentsPackageIsInstalled();

  const { componentsRootDir, utilitiesRootDir, typescript } = config;

  // find the registry items from selected names
  const registryItems = selectedItems.map((name) => REGISTRY_INDEX[name]);

  // build unique list of components and dependencies to copy
  const [localDependencies, dependencies] = buildDepsTree(
    registryItems,
    new Set<Registry>(),
    new Set<string>()
  );

  // wait for all files to be copied
  const allFilesSpinner = ora("Copying files...").start();

  try {
    const allFilesOperations = await copyLocalDependencies({
      localDependencies,
      componentsPackageRoot,
      componentsRootDir,
      utilitiesRootDir,
      typescript,
      cwd,
    });

    const allFilesPromise = Promise.all(allFilesOperations);

    const dependenciesPromise = installDependencies(
      Array.from(dependencies),
      cwd
    );

    await Promise.all([allFilesPromise, dependenciesPromise]);

    await allFilesSpinner.succeed();
  } catch (error) {
    handleError({ error, spinner: allFilesSpinner, exit: true });
  }
}

/**
 * Given an array of component names, builds a set of all components to copy and node dependencies to install.
 */
function buildDepsTree(
  dependencies: Registry[],
  localDependenciesList: Set<Registry>,
  dependenciesList: Set<string>
): [Set<Registry>, Set<string>] {
  for (let dependency of dependencies) {
    // trying to avoind infinite loops
    if (localDependenciesList.has(dependency)) continue;

    localDependenciesList.add(dependency);

    const { localDependencies, dependencies: nodeDependencies } =
      REGISTRY_INDEX[dependency.name];

    if (nodeDependencies && nodeDependencies.length) {
      for (let packageName of nodeDependencies) {
        dependenciesList.add(packageName);
      }
    }

    if (localDependencies && localDependencies.length) {
      buildDepsTree(localDependencies, localDependenciesList, dependenciesList);
    }
  }

  return [localDependenciesList, dependenciesList];
}

/**
 * Copies components by name from the @wethegit/components package to the components directory
 */
async function copyLocalDependencies({
  localDependencies,
  componentsPackageRoot,
  componentsRootDir,
  utilitiesRootDir,
  typescript,
  cwd,
}: {
  localDependencies: Set<Registry>;
  componentsPackageRoot: string;
  componentsRootDir: string;
  utilitiesRootDir: string;
  typescript: boolean;
  cwd: string;
}) {
  const allFilesOperations = [];
  const REGISTRY_TYPE_TO_DEST_DIR_MAP: Record<Registry["type"], string> = {
    component: componentsRootDir,
    utility: utilitiesRootDir,
  };

  for (let [{ type, name }] of localDependencies.entries()) {
    const componentSpinner = ora(
      `Copying ${chalk.yellow(type)} ${chalk.cyan(name)}...`
    ).start();

    const src = resolve(
      componentsPackageRoot,
      REGISTRY_TYPE_TO_ROOT_DIR_MAP[type],
      name
    );

    const dest = resolve(REGISTRY_TYPE_TO_DEST_DIR_MAP[type], name);

    if (!typescript) {
      const files = await glob("*", { cwd: src, absolute: true });

      const filePromises = transformTsToJs({
        cwd,
        files,
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
          .copy(src, dest)
          .then(() => componentSpinner.succeed())
          .catch((error) => handleError({ error, spinner: componentSpinner }))
      );
    }
  }

  return allFilesOperations;
}
