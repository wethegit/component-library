import { REGISTRY_INDEX } from "../../../registry-index"
import type { Registry } from "../../../registry-index"

/**
 * Given an array of registry items, builds a unique set of all items to copy and node dependencies to install.
 */
export function buildDepsTree(
  dependencies: Registry[],
  localDependenciesList: Set<Registry>,
  dependenciesList: Set<string>,
  useTypescript: boolean
): [Set<Registry>, Set<string>] {
  for (let dependency of dependencies) {
    // trying to avoind infinite loops
    if (localDependenciesList.has(dependency)) continue

    if (!REGISTRY_INDEX[dependency.name]) continue

    if (!useTypescript && dependency.category === "type") continue

    localDependenciesList.add(dependency)

    const { localDependencies, dependencies: nodeDependencies } = dependency

    if (nodeDependencies && nodeDependencies.length) {
      for (let packageName of nodeDependencies) {
        dependenciesList.add(packageName)
      }
    }

    if (localDependencies && localDependencies.length) {
      buildDepsTree(
        localDependencies,
        localDependenciesList,
        dependenciesList,
        useTypescript
      )
    }
  }

  return [localDependenciesList, dependenciesList]
}
