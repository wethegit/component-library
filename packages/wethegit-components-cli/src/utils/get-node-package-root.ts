import { resolve } from "node:path"

import appRootPath from "app-root-path"
import resolvePackagePath from "resolve-package-path"

/**
 * Returns the root path of a node package by name or null if not found. Defaults to the root of the current project.
 * Note: this doesn't work for packages that are not installed in the current project.
 */
export function getNodePackageRoot(packageName: string, cwd?: string): null | string {
  const componentsPackageRoot = resolvePackagePath(
    packageName,
    cwd ?? appRootPath.toString()
  )

  if (!componentsPackageRoot) return null

  // resolvePackagePath returns the path to the package.json file, we need to go up one level to get the root
  return resolve(componentsPackageRoot, "..")
}
