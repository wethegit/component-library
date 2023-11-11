import chalk from "chalk";

import {
  buildAndParseConfig,
  logger,
  ensureCwd,
  handleError,
  installDependencies,
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

    try {
      let promises: Promise<any>[] = [];

      // copy styles
      promises.push(copyGlobalStyles({ config }));

      // install global required dependencies
      promises.push(installDependencies(["sass"], cwd));

      await Promise.all(promises);
    } catch (error) {
      handleError({
        error,
        exit: true,
      });
    }

    logger.info("");
    logger.info(`${chalk.green("Success!")} Project initialization completed.`);
    logger.info("");
  } catch (error) {
    logger.error("");
    logger.error(error);
    process.exit(0);
  }
}
