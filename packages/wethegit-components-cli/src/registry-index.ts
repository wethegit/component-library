import {
  COMPONENTS_PACKAGE_COMPONENTS_DIR,
  COMPONENTS_PACKAGE_UTILITIES_DIR,
} from "./utils";

export interface Registry {
  /** Should be the same name as the item's directory */
  name: string;
  /** The type of item. If empty, component */
  type: "component" | "utility";
  /** A glob pattern to match files to copy from the item directory to the project
   * @default "*"
   */
  files?: string;
  /** List of local dependencies. Every listed dependency must also be part of the registry index. */
  localDependencies?: Registry[];
  /** List of node packages */
  dependencies?: string[];
  /** Should this item appear as an option when running the add command. Default is true  */
  dontShowOnPrompt?: boolean;
}

export type RegistryIndex = Record<string, Registry>;

export const REGISTRY_TYPE_TO_ROOT_DIR_MAP: Record<Registry["type"], string> = {
  component: COMPONENTS_PACKAGE_COMPONENTS_DIR,
  utility: COMPONENTS_PACKAGE_UTILITIES_DIR,
};

/* REGISTRY INDEX */
const GRID_LAYOUT: Registry = {
  name: "grid-layout",
  type: "component",
  dependencies: ["classnames"],
  localDependencies: [
    { type: "component", name: "tag" },
    { type: "utility", name: "fixed-forward-ref" },
  ],
};

const FIXED_FORWARD_REF: Registry = {
  name: "fixed-forward-ref",
  type: "utility",
  dontShowOnPrompt: true,
};

export const REGISTRY_INDEX: RegistryIndex = {
  "grid-layout": GRID_LAYOUT,
  "fixed-forward-ref": FIXED_FORWARD_REF,
};
/* END REGISTRY INDEX */
