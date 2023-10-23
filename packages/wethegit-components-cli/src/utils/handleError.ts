import type { Ora } from "ora";

import { logger } from "./logger";

export interface HandleErrorOptions {
  error: unknown;
  spinner?: Ora;
  exit?: boolean;
  spinnerText?: string;
}

export function handleError({
  error,
  spinner,
  exit,
  spinnerText,
}: HandleErrorOptions) {
  logger.error("");
  logger.error(error);

  if (spinner) {
    if (spinnerText) spinner.fail(spinnerText);
    else spinner.fail();
  }

  if (exit) process.exit(1);
}
