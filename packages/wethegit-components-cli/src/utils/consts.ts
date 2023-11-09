import type { Config } from "../global";
import type { RegistryCategory } from "../registry-index";

export const COMPONENTS_PACKAGE_NAME = "@wethegit/components";

export const COMPONENTS_PACKAGE_COMPONENTS_DIR = "src/components";

export const COMPONENTS_PACKAGE_STYLES_DIR = "src/styles";

export const COMPONENTS_PACKAGE_UTILITIES_DIR = "src/utilities";

export const COMPONENTS_PACKAGE_TYPES_DIR = "src/types";

export const DEFAULT_CONFIG_FILE_NAME = "components.config.json";

export const DEFAULT_CONFIG: Config = {
  directories: {
    component: "src/components",
    style: "src/styles",
    utility: "src/utilities",
    type: "types",
  },
};

export const REGISTRY_TYPE_TO_ROOT_DIR_MAP: Record<RegistryCategory, string> = {
  component: COMPONENTS_PACKAGE_COMPONENTS_DIR,
  utility: COMPONENTS_PACKAGE_UTILITIES_DIR,
  style: COMPONENTS_PACKAGE_STYLES_DIR,
  type: COMPONENTS_PACKAGE_TYPES_DIR,
};
