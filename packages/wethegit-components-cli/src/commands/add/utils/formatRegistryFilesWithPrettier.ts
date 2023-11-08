import { join, relative, resolve } from "node:path";
import fse from "fs-extra";
import chalk from "chalk";
import prompts from "prompts";
import ora from "ora";
import { execa } from "execa";

import type { Config } from "../../../index.d";
import { handleError } from "../../../utils";
import type { Registry } from "../../../registry-index";

interface FormatFilesWithPrettierOptions {
  items: Registry[];
  config: Config;
  cwd: string;
}

/**
 * Formats files from the registry directories that were copied into the project with prettier.
 */
export async function formatRegistryFilesWithPrettier({
  items,
  config,
  cwd,
}: FormatFilesWithPrettierOptions) {
  if (items.length <= 0) return;

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
    const files = items
      .filter(({ category }) => category !== "type")
      .map(({ name, category }) => {
        const basePath = config.directories[category];
        if (!basePath) return "";

        const files = join(basePath, name, "**/*");

        return relative(cwd, files);
      });

    await execa(`npx`, [`prettier`, ...files, `--write`], {
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
