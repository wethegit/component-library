import chalk from "chalk"
import type { Command } from "commander"

import {
  logger,
  buildAndParseConfig,
  ensureCwd,
  handleError,
  ensureComponentsPackageIsInstalled,
  installDependencies,
} from "../../utils"
import { REGISTRY_INDEX, type Registry } from "../../registry-index"

import {
  buildDepsTree,
  copyRegistryItems,
  formatRegistryFilesWithPrettier,
  promptForComponents,
} from "./utils"
import prompts from "prompts"

interface Options {
  root: string
  names: string[]
}

export async function add(names: string[], program: Command) {
  try {
    ensureComponentsPackageIsInstalled()

    const { root } = program.opts() as Options

    // different than init if cwd doesnt exist this will throw, user should run init first to ensure deps and other requirements are met
    const cwd = await ensureCwd(root)

    // get our config
    const config = await buildAndParseConfig(cwd, { errorIfNotFound: true })

    const { proceed, selected } =
      names && names.length > 0
        ? await getRegistryItemsFromNames(names)
        : await promptForComponents()

    if (!proceed || selected.length <= 0) process.exit(1)

    // build unique list of components and dependencies to copy
    const [localDependencies, dependencies] = buildDepsTree(
      selected,
      new Set<Registry>(),
      new Set<string>(),
      !!config.directories.type
    )

    const items = Array.from(localDependencies)

    try {
      let promises: Promise<any>[] = []

      // copy items
      promises.push(
        copyRegistryItems({
          cwd,
          config,
          items,
        })
      )

      // install dependencies
      promises.push(installDependencies(Array.from(dependencies), cwd))

      await Promise.all(promises)

      // format items
      await formatRegistryFilesWithPrettier({
        config,
        items,
        cwd,
      })
    } catch (error) {
      handleError({
        error,
        exit: true,
      })
    }

    logger.info("")
    logger.success(`${chalk.green("Success!")} All done!`)
    logger.info("")
  } catch (error) {
    handleError({
      error,
      exit: true,
    })
  }
}

async function getRegistryItemsFromNames(
  names: string[]
): Promise<{ selected: Registry[]; proceed: boolean }> {
  const selected = names.reduce((acc, name) => {
    const registry = REGISTRY_INDEX[name]

    if (!registry) {
      console.log(`${chalk.bold.yellow(name)} not found in registry. Skipping...`)
    } else acc.push(registry)

    return acc
  }, [] as Registry[])

  if (selected.length <= 0) {
    logger.info(``)
    logger.error(`No valid components found. Make sure you're using the correct names.`)
    console.log(
      `${chalk.cyan("Documentation")}: https://wethegit.github.io/component-library/`
    )
    logger.info(``)
    process.exit(1)
  }

  const { proceed } = await prompts(
    [
      {
        type: "confirm",
        name: "proceed",
        message: `This operation will ${chalk.yellow(
          "overwrite"
        )} any existing files, are you sure you want to proceed?`,
        initial: false,
      },
    ],
    {
      onCancel: () => {
        process.exit(1)
      },
    }
  )

  return { selected, proceed }
}
