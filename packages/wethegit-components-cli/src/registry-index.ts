export type RegistryType = "component" | "utility";

export interface Registry {
  /** Should be the same name as the item's directory */
  name: string;
  /** The type of item. If empty, component */
  type: RegistryType;
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
