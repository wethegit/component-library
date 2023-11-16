import { execa } from "execa"
import ora from "ora"

import { getPackageManager } from "./get-package-manager"
import { handleError } from "./handle-error"

export async function installDependencies(deps: string[], cwd: string): Promise<void> {
  const spinner = ora(`Installing dependencies...`).start()

  const packageManager = await getPackageManager(cwd)

  try {
    await execa(packageManager, [packageManager === "npm" ? "install" : "add", ...deps], {
      cwd,
    })

    spinner.succeed()
  } catch (error) {
    handleError({ error, spinner, exit: true })
  }
}
