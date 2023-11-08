import { REGISTRY_INDEX } from "../../../registry-index";
import type { Registry } from "../../../registry-index";

/**
 * Given an array of registry items, builds a unique set of all items to copy and node dependencies to install.
 */
export function buildDepsTree(
  dependencies: Registry[],
  localDependenciesList: Set<Registry>,
  dependenciesList: Set<string>
): [Set<Registry>, Set<string>] {
  for (let dependency of dependencies) {
    // trying to avoind infinite loops
    if (localDependenciesList.has(dependency)) continue;

    const registryItem = REGISTRY_INDEX[dependency.name];

    if (!registryItem) continue;

    localDependenciesList.add(dependency);

    const { localDependencies, dependencies: nodeDependencies } = registryItem;

    if (nodeDependencies && nodeDependencies.length) {
      for (let packageName of nodeDependencies) {
        dependenciesList.add(packageName);
      }
    }

    if (localDependencies && localDependencies.length) {
      buildDepsTree(localDependencies, localDependenciesList, dependenciesList);
    }
  }

  return [localDependenciesList, dependenciesList];
}
