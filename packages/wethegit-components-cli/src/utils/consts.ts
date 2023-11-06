import type { Config } from "../index.d";

export const COMPONENTS_PACKAGE_NAME = "@wethegit/components";

export const COMPONENTS_PACKAGE_COMPONENTS_DIR = "src/components";

export const COMPONENTS_PACKAGE_STYLES_DIR = "src/styles";

export const COMPONENTS_PACKAGE_UTILITIES_DIR = "src/utilities";

export const DEFAULT_CONFIG_FILE_NAME = "components.config.json";

export const DEFAULT_CONFIG: Config = {
  typescript: false,
  rootDir: "src",
  componentsRootDir: "components",
  stylesRootDir: "styles",
  utilitiesRootDir: "utilities",
};
