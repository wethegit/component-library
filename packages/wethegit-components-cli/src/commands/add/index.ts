import chalk from "chalk";

import {
  logger,
  buildAndParseConfig,
  ensureCwd,
  handleError,
  ensureComponentsPackageIsInstalled,
  installDependencies,
} from "../../utils";
import { REGISTRY_INDEX, Registry } from "../../registry-index";

import {
  buildDepsTree,
  copyRegistryItems,
  formatRegistryFilesWithPrettier,
  promptForComponents,
} from "./utils";

interface Options {
  root: string;
}

export async function add(options: Options) {
  try {
    ensureComponentsPackageIsInstalled();

    const { root } = options;

    // different than init if cwd doesnt exist this will throw, user should run init first to ensure deps and other requirements are met
    const cwd = await ensureCwd(root);

    // get our config
    const config = await buildAndParseConfig(cwd, { errorIfNotFound: true });

    // ask what components to install
    const { selectedComponentNames, proceed } = await promptForComponents();

    if (!proceed || selectedComponentNames.length <= 0) process.exit(1);

    // find the registry items from selected names
    const registryItems = selectedComponentNames.map(
      (name) => REGISTRY_INDEX[name]
    );

    // build unique list of components and dependencies to copy
    const [localDependencies, dependencies] = buildDepsTree(
      registryItems,
      new Set<Registry>(),
      new Set<string>()
    );

    const items = Array.from(localDependencies);

    // copy items
    try {
      await copyRegistryItems({
        cwd,
        config,
        items,
      });
    } catch (error) {
      handleError({
        error,
        exit: true,
      });
    }

    // install dependencies
    try {
      await installDependencies(Array.from(dependencies), cwd);
    } catch (error) {
      handleError({
        error,
        exit: true,
      });
    }

    // format items
    try {
      await formatRegistryFilesWithPrettier({
        config,
        items,
        cwd,
      });
    } catch (error) {
      handleError({
        error,
        exit: true,
      });
    }

    logger.info("");
    logger.success(`${chalk.green("Success!")} All done!`);
    logger.info("");
  } catch (error) {
    handleError({
      error,
      exit: true,
    });
  }
}
