import { execa } from "execa";
import ora from "ora";

import { getPackageManager } from "./getPackageManager";
import { logger } from "./logger";

export async function installDependencies(deps: string[], cwd: string) {
  const spinner = ora(`Installing dependencies...`)?.start();

  const packageManager = await getPackageManager(cwd);

  try {
    await execa(
      packageManager,
      [packageManager === "npm" ? "install" : "add", ...deps],
      {
        cwd,
      }
    );
    await spinner?.succeed();
  } catch (e) {
    await spinner?.fail();
    logger.error("Error installing dependencies");
    logger.error(e);
  }
}
