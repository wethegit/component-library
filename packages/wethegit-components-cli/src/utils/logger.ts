/* eslint-disable no-console -- utility function */
import chalk from "chalk"

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args))
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellowBright(...args))
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args))
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args))
  },
  log(...args: unknown[]) {
    console.log(...args)
  },
  break() {
    console.log("")
  },
}
