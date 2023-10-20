import { resolve } from "node:path";
import fse from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { glob } from "glob";
import prompts from "prompts";

import type { Config } from "../../../index.d";
import COMPONENTS_INDEX from "../../../component-index";
import { logger } from "../../../utils";

import { transformTsToJs } from "./transformTsToJs";
import { formatFilesWithPrettier } from "./formatFilesWithPrettier";

interface CopyComponentsByNameOptions {
  componentsPackageRoot: string;
  config: Config;
  selectedComponentNames: string[];
}

export async function copyComponentsByName({
  componentsPackageRoot,
  config,
  selectedComponentNames,
}: CopyComponentsByNameOptions) {
  if (!selectedComponentNames.length) {
    logger.info(`No components selected, exiting...`);
    return;
  }

  const { componentsRootDir, typescript } = config;

  const componentsPackageSrcRoot = resolve(componentsPackageRoot, "../src");

  const { formatFiles } = await prompts({
    type: "confirm",
    name: "formatFiles",
    message: `Do you want to format the output files? It requires ${chalk.cyan(
      "prettier"
    )} to be installed.`,
    initial: true,
  });

  const allFilesSpinner = ora("Copying files...").start();

  const allFilesPromise = [];

  for (let componentName of selectedComponentNames) {
    const componentSpinner = ora(
      `Copying ${chalk.cyan(componentName)}...`
    ).start();

    const { name } = COMPONENTS_INDEX[componentName];

    const src = resolve(componentsPackageSrcRoot, name);
    const dest = resolve(componentsRootDir, name);

    if (!typescript) {
      const files = await glob("*", { cwd: src, absolute: true });

      const filePromises = transformTsToJs({
        files,
        dest,
      });

      allFilesPromise.push(
        filePromises
          .then(() => componentSpinner.succeed())
          .catch((e) => catchError(e, componentSpinner, componentName))
      );
    } else {
      allFilesPromise.push(
        fse
          .copy(src, dest)
          .then(() => componentSpinner.succeed())
          .catch((e) => catchError(e, componentSpinner, componentName))
      );
    }
  }

  if (formatFiles) {
    try {
      await Promise.all(allFilesPromise);
      await allFilesSpinner.succeed();
    } catch (e) {
      catchError(e, allFilesSpinner, "output files");
    }

    const formatSpinner = ora("Formatting output files...").start();

    // NOTE: maybe format format output files?
    const outputFiles = await glob(
      selectedComponentNames.map((name) => `${name}/**/*.jsx`),
      { cwd: componentsRootDir, absolute: true }
    );

    try {
      await formatFilesWithPrettier({
        files: outputFiles,
      });

      await formatSpinner.succeed();
    } catch (e) {
      catchError(e, formatSpinner, "output files");
    }
  } else {
    try {
      await Promise.all(allFilesPromise);
      await allFilesSpinner.succeed();
    } catch (e) {
      catchError(e, allFilesSpinner, "output files");
    }
  }
}

function catchError(
  error: unknown,
  spinner: ReturnType<typeof ora>,
  componentName: string
) {
  logger.error(``);
  logger.error(error);

  spinner.fail(`Error copying ${chalk.cyan(componentName)}`);
}
