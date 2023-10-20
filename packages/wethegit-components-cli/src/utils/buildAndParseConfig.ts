import { resolve } from "node:path";
import fse from "fs-extra";
import chalk from "chalk";
import ora from "ora";

import type { Config } from "../index.d";

import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAME } from "./consts";
import { logger } from "./logger";
import { ensureCwd } from "./ensureCwd";
import { promptForConfig } from "./promptForConfig";
import { resolveConfigPaths } from "./resolveConfigPaths";

interface BuildAndParseConfigOptions {
  skipPrompt: boolean;
}

type BuildAndParseConfigReturn = Config;

export async function buildAndParseConfig(
  root: string,
  options?: BuildAndParseConfigOptions
): Promise<BuildAndParseConfigReturn> {
  const { skipPrompt = false } = options || {};

  const spinner = ora("Determining config options...").start();

  const cwd = root || (await ensureCwd(root));

  let config: Config = DEFAULT_CONFIG;

  const localConfigFile = resolve(cwd, DEFAULT_CONFIG_FILE_NAME);

  if (await fse.pathExists(localConfigFile)) {
    await spinner.info(`Found ${chalk.cyan(DEFAULT_CONFIG_FILE_NAME)} file`);

    try {
      const localConfig = await fse.readJson(localConfigFile);

      config = {
        ...config,
        ...localConfig,
      };
    } catch (e) {
      await spinner.fail("Error parsing local config file");
      logger.error(e);
      process.exit(1);
    }
  } else {
    await spinner.succeed();

    const configFromPrompt = await promptForConfig(cwd, skipPrompt);

    config = {
      ...config,
      ...configFromPrompt,
    };
  }
  const resolvedConfig = await resolveConfigPaths({
    cwd,
    config,
  });

  // Write to file.
  const spinnerJson = ora(`Writing ${DEFAULT_CONFIG_FILE_NAME}...`).start();

  const targetPath = resolve(cwd, DEFAULT_CONFIG_FILE_NAME);

  try {
    await fse.outputJson(targetPath, config, { spaces: 2 });
  } catch (error) {
    await spinnerJson.fail();
    logger.error(`Failed to write ${targetPath}.`);
    logger.error(error);
    process.exit(1);
  }

  await spinnerJson.succeed();

  return resolvedConfig;
}
