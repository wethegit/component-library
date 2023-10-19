import { resolve } from "node:path";
import fse from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";

import type { Config } from "../index.d";

import { logger } from "./logger";
import { DEFAULT_CONFIG_FILE_NAME, DEFAULT_CONFIG } from "./consts";

export async function promptForConfig(
  cwd: string,
  skip: boolean
): Promise<Config> {
  let config: Config = DEFAULT_CONFIG;

  if (!skip) {
    const highlight = (text: string) => chalk.cyan(text);

    const tsConfigPath = resolve(cwd, "./tsconfig.json");
    const isThereATsConfig = await fse.pathExists(tsConfigPath);

    const response = await prompts(
      [
        {
          type: "confirm",
          name: "typescript",
          message: `Are you using ${highlight("Typescript")}?`,
          initial: isThereATsConfig,
        },
        {
          type: "text",
          name: "componentsRootDir",
          message: `What is your ${highlight("components")} root directory?`,
          initial: DEFAULT_CONFIG.componentsRootDir,
        },
      ],
      {
        onCancel: () => {
          process.exit(1);
        },
      }
    );

    config = {
      ...DEFAULT_CONFIG,
      ...response,
    };

    const proceed = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Is this correct?\n${JSON.stringify(config, null, 2)}`,
      initial: true,
    });

    if (!proceed) process.exit(0);
  }

  // Write to file.
  const spinner = ora(`Writing ${DEFAULT_CONFIG_FILE_NAME}...`).start();

  const targetPath = resolve(cwd, DEFAULT_CONFIG_FILE_NAME);

  try {
    await fse.outputJson(targetPath, config, { spaces: 2 });
  } catch (error) {
    await spinner.fail();
    logger.error(`Failed to write ${targetPath}.`);
    logger.error(error);
    process.exit(1);
  }

  await spinner.succeed();

  return config;
}
