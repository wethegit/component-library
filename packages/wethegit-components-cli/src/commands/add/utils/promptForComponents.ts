import prompts from "prompts"
import chalk from "chalk"

import { REGISTRY_INDEX } from "../../../registry-index"
import type { Registry } from "../../../registry-index"

export function promptForComponents(): Promise<{
  selected: Registry[]
  proceed: boolean
}> {
  return prompts(
    [
      {
        type: "multiselect",
        name: "selected",
        message: "What components would you like to add?",
        choices: Object.values(REGISTRY_INDEX)
          .filter(({ dontShowOnPrompt }) => !dontShowOnPrompt)
          .map((a) => ({
            title: `${chalk.yellow(a.category)}: ${a.name}`,
            value: a,
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
        process.exit(1)
      },
    }
  )
}
