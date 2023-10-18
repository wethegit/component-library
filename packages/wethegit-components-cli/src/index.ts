#!/usr/bin/env node
import { Command } from "commander";

import { version } from "../package.json";

import { add } from "./commands/add";
import { init } from "./commands/init";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const program = new Command()
  .name("components-cli")
  .description("add components and dependencies to your project")
  .version(version || "1.0.0", "-v, --version");

program
  .command("init")
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(init);

program
  .command("add")
  .name("add")
  .description("add component to your project and install dependencies")
  .action(add);

program.parse(process.argv);

console.log(program.args[0]);
