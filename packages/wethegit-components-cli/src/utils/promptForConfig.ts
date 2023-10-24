import { resolve } from "node:path";
import fse from "fs-extra";
import chalk from "chalk";
import prompts from "prompts";

import type { Config } from "../index.d";

import { DEFAULT_CONFIG } from "./consts";

/**
 * Prompts the user for config options.
 */
export async function promptForConfig(
  cwd: string,
  skip: boolean
): Promise<Config> {
  let config: Config = DEFAULT_CONFIG;

  if (!skip) {
    const highlight = (text: string) => chalk.cyan(text);

    const defaultTsConfigPath = "./tsconfig.json";
    const isThereATsConfig = await fse.pathExists(
      resolve(cwd, defaultTsConfigPath)
    );

    let response = await prompts(
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
        {
          type: "text",
          name: "stylesRootDir",
          message: `What is your ${highlight("styles")} root directory?`,
          initial: DEFAULT_CONFIG.stylesRootDir,
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

    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Is this correct?\n${JSON.stringify(config, null, 2)}`,
      initial: true,
    });

    if (!proceed) process.exit(0);
  }

  return config;
}
