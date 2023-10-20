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

    const defaultTsConfigPath = "./tsconfig.json";
    const isThereATsConfig = await fse.pathExists(
      resolve(cwd, defaultTsConfigPath)
    );

    let { tsconfigPath, typescript, ...response } = await prompts(
      [
        {
          type: "confirm",
          name: "typescript",
          message: `Are you using ${highlight("Typescript")}?`,
          initial: isThereATsConfig,
        },
        {
          type: (prev) => (prev ? "text" : null),
          name: "tsconfigPath",
          message: `Where is ${highlight("tsconfig.json")} localed?`,
          initial: defaultTsConfigPath,
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

    if (typescript) {
      typescript = {
        tsconfigPath,
      };
    }

    config = {
      ...DEFAULT_CONFIG,
      ...response,
      typescript,
    };

    const proceed = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Is this correct?\n${JSON.stringify(config, null, 2)}`,
      initial: true,
    });

    if (!proceed) process.exit(0);
  }

  return config;
}
