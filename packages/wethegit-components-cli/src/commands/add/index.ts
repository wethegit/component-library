import { Command } from "commander"
import chalk from "chalk"

import { handleError, logger } from "../../utils"

export const add = new Command()
  .name("add")
  .description("add component to your project and install dependencies")
  .action(async (options) => {
    try {
      logger.info("")
      logger.info(
        `${chalk.green("Success!")} Project initialization completed.`
      )
      logger.info("")
    } catch (error) {
      handleError(error)
    }
  })