import chalk from "chalk";

import { handleError, logger } from "../../utils";

interface Options {
  cwd: string;
}

export async function add(options: Options) {
  try {
    console.log("add");
    console.log(options);
    logger.info("");
    logger.info(`${chalk.green("Success!")} Project initialization completed.`);
    logger.info("");
  } catch (error) {
    handleError(error);
  }
}
