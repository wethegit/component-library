import { Command } from "commander"

import packageInfo from "../package.json"

import { add } from "./commands/add"
import { init } from "./commands/init"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("wtc-components")
    .description("add components and dependencies to your project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version"
    )

  program.addCommand(init).addCommand(add)

  program.parse(process.argv)
}

main()