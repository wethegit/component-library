import chalk from "chalk";
import appRootPath from "app-root-path";
import resolvePackagePath from "resolve-package-path";
import ora from "ora";

import { logger, buildAndParseConfig, ensureCwd } from "../../utils";

import { copyComponentsByName, promptForComponents } from "./utils";

interface Options {
  root: string;
}

export async function add(options: Options) {
  try {
    const componentsPackageRoot = resolvePackagePath(
      "@wethegit/components",
      appRootPath.toString()
    );

    if (!componentsPackageRoot) {
      logger.error(
        "Failed to find @wethegit/components package. It should be installed as a dependency automatically, something went wrong with the CLI installation."
      );
      process.exit(1);
    }

    const { root } = options;

    // different than init if cwd doesnt exist this will throw, user should run init first to ensure deps and other requirements are met
    const cwd = await ensureCwd(root);

    // get our config
    const { componentsRootDir } = await buildAndParseConfig(cwd);

    // ask what components to install
    const { selectedComponentNames, proceed } = await promptForComponents();
    if (!proceed) process.exit(1);

    // copy components
    const spinner = ora("Copying components...").start();

    const copyPromises = copyComponentsByName(
      componentsPackageRoot,
      componentsRootDir,
      selectedComponentNames
    );

    try {
      await copyPromises;
    } catch (e) {
      await spinner.fail("Error copying components");
      logger.error("");
      logger.error(e);
      process.exit(1);
    }

    await spinner.succeed();

    logger.info("");
    logger.info(`${chalk.green("Success!")} All done!`);
    logger.info("");
  } catch (error) {
    logger.error("");
    logger.error(error);
    process.exit(0);
  }
}
