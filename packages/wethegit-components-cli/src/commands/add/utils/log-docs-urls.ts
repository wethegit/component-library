import chalk from "chalk"

import type { Registry } from "../../../registry-index"
import { logger } from "../../../utils"

export function logDocsUrls(selected: Registry[]): void {
  const hasDocs = selected.some((item) => Boolean(item.docsUrl))

  logger.info("Next steps")
  logger.log(
    "Check out the documentation, some of these component might require further configuration."
  )

  if (!hasDocs) {
    logger.log("https://wethegit.github.io/component-library/")
  }

  for (const item of selected) {
    if (!item.docsUrl && !item.postInstallMessages) continue

    logger.log("")
    logger.info(`${item.name}`)
    if (item.docsUrl)
      logger.log(`${chalk.bold("Documentation:")} ${chalk.italic(item.docsUrl)}`)

    if (item.postInstallMessages) {
      for (const message of item.postInstallMessages) {
        logger.log(chalk.gray(message))
      }
    }
  }
}
