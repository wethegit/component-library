import { relative, resolve } from "node:path"

import ora from "ora"
import fse from "fs-extra"
import chalk from "chalk"
import { glob } from "glob"

import type { Config } from "../../../global"
import {
  COMPONENTS_PACKAGE_STYLES_DIR,
  ensureComponentsPackageIsInstalled,
  handleError,
} from "../../../utils"

export interface CopyGlobalStylesOptions {
  config: Config
}

export async function copyGlobalStyles({
  config,
}: CopyGlobalStylesOptions): Promise<void> {
  if (!config.directories.style) return

  const componentsPackageRoot = ensureComponentsPackageIsInstalled()

  const {
    directories: { style: stylesRootDir },
  } = config

  // create components dir if it doesnt exist
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

  const spinner = ora("Copying global styles...").start()

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
