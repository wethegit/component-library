import { resolve } from "node:path"

import fse from "fs-extra"
import chalk from "chalk"
import prompts from "prompts"

import type { Config } from "../global"

import { DEFAULT_CONFIG } from "./consts"

/**
 * Prompts the user for config options.
 */
export async function promptForConfig(cwd: string, skip: boolean): Promise<Config> {
  let config: Config = DEFAULT_CONFIG

  const defaultTsConfigPath = "./tsconfig.json"
  const isThereATsConfig = await fse.pathExists(resolve(cwd, defaultTsConfigPath))

  if (!skip) {
    const highlight = (text: string): string => chalk.cyan(text)

    const response: Record<string, string> = await prompts(
      [
        {
          type: "confirm",
          name: "_typescript",
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
        {
          type: "text",
          name: "hooksRootDir",
          message: `What is your ${highlight("hooks")} directory?`,
          initial: DEFAULT_CONFIG.directories.hook,
        },
      ],
      {
        onCancel: () => {
          process.exit(0)
        },
      }
    )

    const {
      typesRootDir,
      componentsRootDir,
      stylesRootDir,
      utilitiesRootDir,
      hooksRootDir,
    } = response
    const { directories, ...defaultConfig } = DEFAULT_CONFIG

    config = {
      ...defaultConfig,
      directories: {
        ...directories,
        component: componentsRootDir,
        style: stylesRootDir,
        utility: utilitiesRootDir,
        hook: hooksRootDir,
        ...(typesRootDir ? { type: typesRootDir } : {}),
      },
    }
  } else {
    const { directories, ...defaultConfig } = DEFAULT_CONFIG
    const { type, ...defaultDirectories } = directories

    config = {
      ...defaultConfig,
      directories: {
        ...defaultDirectories,
        type: isThereATsConfig ? type : false,
      },
    }
  }

  const { proceed }: Record<string, boolean> = await prompts({
    type: "confirm",
    name: "proceed",
    message: `Is this correct?\n${JSON.stringify(config, null, 2)}`,
    initial: true,
  })

  if (!proceed) process.exit(0)

  return config
}
