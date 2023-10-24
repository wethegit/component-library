import chalk from "chalk";

import {
  buildAndParseConfig,
  logger,
  ensureCwd,
  handleError,
} from "../../utils";

import { copyGlobalStyles } from "./utils";

interface Options {
  root: string;
  skip: boolean;
}

export async function init({ root, skip }: Options) {
  try {
    // get cwd and ensure it exists, this will be our root
    const cwd = await ensureCwd(root, { createIfNotExist: true });

    // Read config and prompt for config if can't find it, optionally skip it and return default
    const config = await buildAndParseConfig(cwd, { skipPrompt: skip });

    // copy styles
    try {
      await copyGlobalStyles({ config });
    } catch (error) {
      handleError({
        error,
        exit: true,
      });
    }

    /*
      NOTE: in the future we might wanna install required/global dependencies
      // Install dependencies.
      const dependenciesSpinner = ora(`Installing dependencies...`)?.start();

      try {
        await installDependencies(deps);
        dependenciesSpinner?.succeed();
      }
      catch (e) {
        dependenciesSpinner?.fail();
        logger.error(e);
        process.exit(1);
      }
    */

    logger.info("");
    logger.info(`${chalk.green("Success!")} Project initialization completed.`);
    logger.info("");
  } catch (error) {
    logger.error("");
    logger.error(error);
    process.exit(0);
  }
}
