import { COMPONENTS_PACKAGE_NAME } from "./consts";
import { getNodePackageRoot } from "./getNodePackageRoot";
import { logger } from "./logger";

/**
 * Ensures that @wethegit/components package is installed
 * It will exit the process if it's not installed otherwise return the package root
 */
export function ensureComponentsPackageIsInstalled() {
  // if components are not installed we don't proceed at all
  const componentsPackageRoot = getNodePackageRoot(COMPONENTS_PACKAGE_NAME);

  if (!componentsPackageRoot) {
    logger.error(
      "Failed to find @wethegit/components package. It should've been installed as a dependency automatically when installing the CLI. Something is wrong with the package release."
    );

    process.exit(1);
  }

  return componentsPackageRoot;
}
