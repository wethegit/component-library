import { existsSync } from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import {execa} from "execa";

import {
  getPackageManager,
  promptForConfig,
  getConfig,
  logger,
  handleError,
} from "../../utils";

interface Options {
  cwd: string;
  yes: boolean;
}

export async function init(options: Options) {
  try {
    console.log("init");
    console.log(options);
    const cwd = path.resolve(options.cwd);

    // Ensure target directory exists.
    if (!existsSync(cwd)) {
      logger.error(`The path ${cwd} does not exist. Please try again.`);
      process.exit(1);
    }

    // Read config.
    const existingConfig = await getConfig(cwd);
    const config = await promptForConfig(cwd, existingConfig, options.yes);

    const spinner = ora(`Initializing project...`)?.start();

    // TODO: Ensure all resolved paths directories exist.

    spinner?.succeed();

    // Install dependencies.
    const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
    const packageManager = await getPackageManager(cwd);

    // TODO: add support for other library dependecies
    const deps = [""];

    await execa(
      packageManager,
      [packageManager === "npm" ? "install" : "add", ...deps],
      {
        cwd,
      }
    );
    dependenciesSpinner?.succeed();

    logger.info("");
    logger.info(`${chalk.green("Success!")} Project initialization completed.`);
    logger.info("");
  } catch (error) {
    handleError(error);
  }
}
