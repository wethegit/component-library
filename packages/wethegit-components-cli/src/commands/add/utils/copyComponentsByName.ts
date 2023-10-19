import { resolve } from "node:path";
import fse from "fs-extra";
import ora from "ora";
import chalk from "chalk";

import COMPONENTS_INDEX from "../../../component-index";
import { logger } from "../../../utils";

export function copyComponentsByName(
  componentsPackageRoot: string,
  componentsRootDir: string,
  selectedComponentNames: string[]
) {
  const componentsPackageSrcRoot = resolve(componentsPackageRoot, "../src");
  const allFilesPromise = [];
  for (let componentName of selectedComponentNames) {
    const componentSpinner = ora(
      `Copying ${chalk.cyan(componentName)}...`
    ).start();

    const { name } = COMPONENTS_INDEX[componentName];

    const src = resolve(componentsPackageSrcRoot, name);
    const dest = resolve(componentsRootDir, name);

    allFilesPromise.push(
      fse
        .copy(src, dest)
        .then(() => componentSpinner.succeed())
        .catch((e) => {
          logger.error(``);
          logger.error(e);

          return componentSpinner.fail(
            `Error copying ${chalk.cyan(componentName)}`
          );
        })
    );
  }

  return Promise.all(allFilesPromise);
}
