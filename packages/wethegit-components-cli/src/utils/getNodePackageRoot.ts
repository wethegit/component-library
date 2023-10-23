import { resolve } from "node:path";
import appRootPath from "app-root-path";
import resolvePackagePath from "resolve-package-path";

/**
 * Returns the root path of a node package.
 */
export function getNodePackageRoot(packageName: string) {
  let componentsPackageRoot = resolvePackagePath(
    packageName,
    appRootPath.toString()
  );

  if (!componentsPackageRoot) return null;

  // resolvePackagePath returns the path to the package.json file, we need to go up one level to get the root
  return resolve(componentsPackageRoot, "..");
}
