import prompts from "prompts";
import chalk from "chalk";

import { REGISTRY_INDEX } from "../../../registry-index";

export function promptForComponents(): Promise<{
  selectedComponentNames: (keyof typeof REGISTRY_INDEX)[];
  proceed: boolean;
}> {
  return prompts(
    [
      {
        type: "multiselect",
        name: "selectedComponentNames",
        message: "What components would you like to add?",
        choices: Object.values(REGISTRY_INDEX)
          .filter(
            ({ dontShowOnPrompt, type }) =>
              type === "component" && !dontShowOnPrompt
          )
          .map(({ name }) => ({
            title: name,
            value: name,
          })),
      },
      {
        type: (val) => (val.length > 0 ? "confirm" : null),
        name: "proceed",
        message: `This operation will ${chalk.yellow(
          "overwrite"
        )} any existing files, are you sure you want to proceed?`,
        initial: false,
      },
    ],
    {
      onCancel: () => {
        process.exit(1);
      },
    }
  );
}
