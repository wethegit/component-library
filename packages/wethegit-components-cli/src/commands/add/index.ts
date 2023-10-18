import chalk from "chalk";
import appRootPath from "app-root-path";
import resolvePackagePath from "resolve-package-path";

import {
  handleError,
  logger,
  buildAndParseConfig,
  ensureCwd,
} from "../../utils";

interface Options {
  root: string;
}

export async function add(options: Options) {
  try {
    console.log("add");
    console.log(appRootPath.toString());
    console.log(
      resolvePackagePath("@wethegit/components", appRootPath.toString())
    );
    console.log(options);

    const { root } = options;

    // different than init if cwd doesnt exist this will throw, user should run init first to ensure deps and other requirements are met
    const cwd = await ensureCwd(root);

    const config = await buildAndParseConfig(cwd);

    logger.info("");
    logger.info(`${chalk.green("Success!")} All done!`);
    logger.info("");
  } catch (error) {
    handleError(error);
  }
}
