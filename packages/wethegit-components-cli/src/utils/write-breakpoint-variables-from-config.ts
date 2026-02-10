import { relative, resolve } from "node:path"

import chalk from "chalk"
import fse from "fs-extra"
import ora from "ora"
import { glob } from "glob"

import type { Config } from "../global"
import {
  COMPONENTS_PACKAGE_STYLES_DIR,
  getComponentsPackageRoot,
  handleError,
} from "../utils"

export interface WriteBreakpointVariablesFromConfigArgs {
  config: Config
  targetPath: string
}

export async function writeBreakpointVariablesFromConfig({
  config,
  targetPath,
}: WriteBreakpointVariablesFromConfigArgs): Promise<void> {
  const componentsPackageRoot = getComponentsPackageRoot()

  console.log(targetPath)

  const {
    directories: { style: stylesRootDir },
  } = config

  // TODO: DRY this up. Consider a utility such as createCategoryDirectory({config: Config, registryCategory: RegistryCategory})
  // create components/styles/ dir if it doesnt exist
  if (!(await fse.pathExists(stylesRootDir))) {
    const spinner = ora(
      `Styles root directory ${chalk.cyan(stylesRootDir)} does not exist, creating...`
    ).start()

    try {
      await fse.ensureDir(stylesRootDir)

      spinner.succeed()
    } catch (error) {
      handleError({
        error,
        spinner,
        exit: true,
        spinnerText: `Error creating ${chalk.cyan(stylesRootDir)} directory`,
      })
    }
  }

  const spinner = ora("Writing breakpoint variables...").start()

  // TODO: Write to the breakpoint file.
  try {
    const src = resolve(componentsPackageRoot, COMPONENTS_PACKAGE_STYLES_DIR)

    const files = await glob("**/*", {
      ignore: ["**/*.stories*", "**/*.mdx*"],
      cwd: src,
      absolute: true,
      nodir: true,
    })

    await Promise.all(
      files.map((file) =>
        fse.copy(file, resolve(stylesRootDir, relative(src, file)), {
          overwrite: true,
        })
      )
    )

    spinner.succeed()
  } catch (error) {
    handleError({
      error,
      spinner,
      exit: true,
    })
  }
}
