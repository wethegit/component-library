import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";

import { logger } from "./logger";

export async function promptForConfig(
  cwd: string,
  defaultConfig: {},
  skip = false
) {
  const highlight = (text: string) => chalk.cyan(text);

  const options = {};

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlight(
        "wtc-components.config.json"
      )}. Proceed?`,
      initial: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  // Write to file.
  logger.info("");
  const spinner = ora(`Writing components.json...`).start();
  const targetPath = path.resolve(cwd, "wtc-components.config.json");
  await fs.writeFile(targetPath, JSON.stringify(options, null, 2), "utf8");
  spinner.succeed();

  return options;
}
