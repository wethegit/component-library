import { execa } from "execa";
import ora from "ora";

import { getPackageManager } from "./getPackageManager";
import { handleError } from "./handleError";

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
  } catch (error) {
    handleError({ error, spinner, exit: true });
  }
}
