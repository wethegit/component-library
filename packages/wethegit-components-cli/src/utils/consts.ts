import type { Config } from "../index.d";
import type { RegistryType } from "../registry-index";

export const COMPONENTS_PACKAGE_NAME = "@wethegit/components";

export const COMPONENTS_PACKAGE_COMPONENTS_DIR = "src/components";

export const COMPONENTS_PACKAGE_STYLES_DIR = "src/styles";

export const COMPONENTS_PACKAGE_UTILITIES_DIR = "src/utilities";

export const DEFAULT_CONFIG_FILE_NAME = "components.config.json";

export const DEFAULT_CONFIG: Config = {
  typescript: false,
  componentsRootDir: "src/components",
  stylesRootDir: "src/styles",
  utilitiesRootDir: "src/utilities",
};

export const REGISTRY_TYPE_TO_ROOT_DIR_MAP: Record<RegistryType, string> = {
  component: COMPONENTS_PACKAGE_COMPONENTS_DIR,
  utility: COMPONENTS_PACKAGE_UTILITIES_DIR,
};
