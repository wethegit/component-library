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
          type: (prev) => (prev ? "text" : null),
          name: "typesRootDir",
          message: `What is your global ${highlight("types")} directory?`,
          initial: DEFAULT_CONFIG.directories.type,
        },
        {
          type: "text",
          name: "componentsRootDir",
          message: `What is your ${highlight("components")} directory?`,
          initial: DEFAULT_CONFIG.directories.component,
        },
        {
          type: "text",
          name: "stylesRootDir",
          message: `What is your ${highlight("styles")} directory?`,
          initial: DEFAULT_CONFIG.directories.style,
        },
        {
          type: "text",
          name: "utilitiesRootDir",
          message: `What is your ${highlight("utilities")} directory?`,
          initial: DEFAULT_CONFIG.directories.utility,
        },
      ],
      {
        onCancel: () => {
          process.exit(1);
        },
      }
    );

    const {
      typescript,
      typesRootDir,
      componentsRootDir,
      stylesRootDir,
      utilitiesRootDir,
      ...responseConfig
    } = response;

    const { directories, ...defaultConfig } = DEFAULT_CONFIG;
    const { type, ...defaultDirectories } = directories;

    config = {
      ...defaultConfig,
      ...responseConfig,
      directories: {
        ...defaultDirectories,
        component: componentsRootDir,
        style: stylesRootDir,
        utility: utilitiesRootDir,
        type: typesRootDir,
      },
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
