import prompts from "prompts";
import chalk from "chalk";

import COMPONENTS_INDEX from "../../../component-index";

export function promptForComponents() {
  return prompts([
    {
      type: "multiselect",
      name: "selectedComponentNames",
      message: "What components would you like to add?",
      choices: Object.values(COMPONENTS_INDEX).map(({ name }) => ({
        title: name,
        value: name,
      })),
    },
    {
      type: "confirm",
      name: "proceed",
      message: `This operation will ${chalk.yellow(
        "overwrite"
      )} any existing files, are you sure you want to proceed?`,
    },
  ]);
}