import { relative, resolve } from "node:path";
import fse from "fs-extra";
import chalk from "chalk";
import prompts from "prompts";
import ora from "ora";
import { execa } from "execa";

import type { Config } from "../../../index.d";
import { handleError } from "../../../utils";

interface FormatFilesWithPrettierOptions {
  selectedComponentNames: string[];
  config: Config;
  cwd: string;
}

/**
 * Formats files in the components output directory with prettier.
 */
export async function formatComponentFilesWithPrettier({
  selectedComponentNames,
  config,
  cwd,
}: FormatFilesWithPrettierOptions) {
  if (selectedComponentNames.length <= 0) return;

  const isPrettierInstalled = await fse.exists(
    resolve(cwd, "node_modules", "prettier")
  );

  if (!isPrettierInstalled) return;

  // if they have prettier installed it's most likely already configured
  const { formatFiles } = await prompts(
    {
      type: "confirm",
      name: "formatFiles",
      message: `Seems that ${chalk.cyan(
        "prettier"
      )} is installed. Do you want to format the output files?`,
      initial: true,
    },
    {
      onCancel: () => {
        process.exit(1);
      },
    }
  );

  if (!formatFiles) return;

  const formatSpinner = ora("Formatting output files...").start();

  try {
    // don't even ask if there are no files to format
    const files = resolve(
      config.componentsRootDir,
      selectedComponentNames.length > 1
        ? `{${selectedComponentNames.join(",")}}`
        : selectedComponentNames[0],
      "**/*"
    );

    const rel = relative(cwd, files);

    await execa(`npx`, [`prettier`, `${rel}`, `--write`], {
      cwd: cwd,
    });

    await formatSpinner.succeed();
  } catch (error) {
    handleError({
      error,
      spinner: formatSpinner,
      exit: true,
    });
  }
}
