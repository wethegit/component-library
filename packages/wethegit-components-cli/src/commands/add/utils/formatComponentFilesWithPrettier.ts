import fse from "fs-extra";
import chalk from "chalk";
import prompts from "prompts";
import ora from "ora";
import { glob } from "glob";

import type { Config } from "../../../index.d";
import { getNodePackageRoot, handleError } from "../../../utils";

interface FormatFilesWithPrettierOptions {
  selectedComponentNames: string[];
  config: Config;
}

/**
 * Formats files in the components output directory with prettier.
 */
export async function formatComponentFilesWithPrettier({
  selectedComponentNames,
  config,
}: FormatFilesWithPrettierOptions) {
  if (selectedComponentNames.length <= 0) return;

  // don't even ask if there are no files to format
  const files = await glob(
    selectedComponentNames.map((name) => `${name}/**/*.jsx`),
    { cwd: config.componentsRootDir, absolute: true }
  );

  if (!files.length) return;

  const isPrettierInstalled = getNodePackageRoot("prettier");

  if (!isPrettierInstalled) return;

  // if they have prettier installed it's most likely already configured
  const { formatFiles } = await prompts({
    type: "confirm",
    name: "formatFiles",
    message: `Seems that ${chalk.cyan(
      "prettier"
    )} is installed. Do you want to format the output files?`,
    initial: true,
  });

  if (!formatFiles) return;

  const formatSpinner = ora("Formatting output files...").start();

  try {
    const { resolveConfig, format } = await import("prettier");

    let formattedFiles = [];

    let options;

    for (let file of files) {
      const text = await fse.readFile(file, "utf8");

      // only resolve config once
      if (!options) options = await resolveConfig(file);

      const formatted = await format(text, {
        ...options,
        parser: "babel",
      });

      formattedFiles.push(fse.outputFile(file, formatted));
    }

    await Promise.all(formattedFiles);
  } catch (error) {
    handleError({
      error,
      spinner: formatSpinner,
      exit: true,
    });
  }
}
