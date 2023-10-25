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
  installDependencies,
} from "../../../utils";

import { transformTsToJs } from "./transformTsToJs";

interface CopyComponentsByNameOptions {
  cwd: string;
  config: Config;
  selectedComponentNames: string[];
}

/**
 * Copies components by name from the @wethegit/components package to the components directory.
 */
export async function copyComponentsByName({
  cwd,
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
  await ensureComponentsDir(componentsRootDir);

  // build unique list of components and dependencies to copy
  const [components, dependencies] = buildDepsTree(
    selectedComponentNames,
    new Set<string>(selectedComponentNames),
    new Set<string>()
  );

  // wait for all files to be copied
  const allFilesSpinner = ora("Copying files...").start();

  try {
    const allFilesOperations = await copyComponents({
      components,
      componentsPackageRoot,
      componentsRootDir,
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
  componentNames: string[],
  componentsList: Set<string>,
  dependenciesList: Set<string>
) {
  for (let componentName of componentNames) {
    const { localDependencies, dependencies } = COMPONENTS_INDEX[componentName];

    componentsList.add(componentName);

    if (dependencies && dependencies.length) {
      for (let dependency of dependencies) {
        dependenciesList.add(dependency);
      }
    }

    if (localDependencies && localDependencies.length) {
      buildDepsTree(localDependencies, componentsList, dependenciesList);
    }
  }

  return [componentsList, dependenciesList];
}

/**
 * Copies components by name from the @wethegit/components package to the components directory
 */
async function copyComponents({
  components,
  componentsPackageRoot,
  componentsRootDir,
  typescript,
  cwd,
}: {
  components: Set<string>;
  componentsPackageRoot: string;
  componentsRootDir: string;
  typescript: boolean;
  cwd: string;
}) {
  const allFilesOperations = [];

  for (let [componentName] of components.entries()) {
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

/**
 * Ensures the components directory exists
 */
async function ensureComponentsDir(componentsRootDir: string) {
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
}
