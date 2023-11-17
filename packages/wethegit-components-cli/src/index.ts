import { Command, Argument } from "commander"

import { version } from "../package.json"

import { add } from "./commands/add"
import { init } from "./commands/init"
import { REGISTRY_INDEX } from "./registry-index"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const program = new Command()

program
  .name("components-cli")
  .description("Add components and dependencies to your project")
  .version(version || "1.0.0", "-v, --version")

program
  .command("init")
  .name("init")
  .description("Initialize your project and install dependencies")
  .option("-s, --skip", "skip confirmation prompt.", false)
  .option(
    "-r, --root <root>",
    "the working directory. defaults to the current directory."
  )
  .action(init)

program
  .command("add")
  .name("add")
  .description("Add component to your project and install dependencies")
  .addArgument(
    new Argument("<names...>", "component names")
      .choices(Object.keys(REGISTRY_INDEX))
      .argOptional()
  )
  .option(
    "-r, --root <root>",
    "the working directory. defaults to the current directory."
  )
  .action(add)

program.parse(process.argv)
