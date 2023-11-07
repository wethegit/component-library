import chalk from "chalk";

import {
  logger,
  buildAndParseConfig,
  ensureCwd,
  handleError,
  ensureComponentsPackageIsInstalled,
} from "../../utils";

import {
  copyRegistryItems,
  formatComponentFilesWithPrettier,
  promptForComponents,
} from "./utils";
import { REGISTRY_INDEX } from "../../registry-index";

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

    // copy components
    try {
      await copyRegistryItems({
        cwd,
        config,
        selectedItems: selectedComponentNames,
      });
    } catch (error) {
      handleError({
        error,
        exit: true,
      });
    }

    // format component files
    try {
      await formatComponentFilesWithPrettier({
        config,
        selectedComponentNames,
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
