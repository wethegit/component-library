import chalk from "chalk"
import prompts from "prompts"

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
  logDocsUrls,
  promptForComponents,
} from "./utils"

interface Options {
  root?: string
}

export async function add(names: string[], options: Options): Promise<void> {
  try {
    ensureComponentsPackageIsInstalled()

    const { root }: Options = options

    // different than init if cwd doesnt exist this will throw, user should run init first to ensure deps and other requirements are met
    const cwd = await ensureCwd(root)

    // get our config
    const config = await buildAndParseConfig(cwd, { errorIfNotFound: true })

    const { proceed, selected } =
      names.length > 0
        ? await getRegistryItemsFromNames(names)
        : await promptForComponents()

    if (!proceed || selected.length <= 0) process.exit(0)

    // build unique list of components and dependencies to copy
    const [localDependencies, dependencies] = buildDepsTree(
      selected,
      new Set<Registry>(),
      new Set<string>(),
      Boolean(config.directories.type)
    )

    const items = Array.from(localDependencies)

    try {
      const promises: Promise<void>[] = []

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

    logger.log("")
    logger.log("")
    logger.success(`${chalk.green("Success!")} All done!`)
    logger.log("")

    logDocsUrls(selected)

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
  const selected = names.reduce<Registry[]>((acc, name) => {
    const registry = REGISTRY_INDEX[name]

    if (!registry) {
      logger.log(`${chalk.bold.yellow(name)} not found in registry. Skipping...`)
    } else acc.push(registry)

    return acc
  }, [])

  if (selected.length <= 0) {
    logger.info(``)
    logger.error(`No valid components found. Make sure you're using the correct names.`)
    logger.log(
      `${chalk.cyan("Documentation")}: https://wethegit.github.io/component-library/`
    )
    logger.info(``)
    process.exit(0)
  }

  const { proceed }: Record<string, boolean> = await prompts(
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
        process.exit(0)
      },
    }
  )

  return { selected, proceed }
}
