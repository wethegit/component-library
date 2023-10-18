import { ensureDir, pathExists } from "fs-extra";
import { resolve } from "path";

import { logger } from "./logger";

interface EnsureCwdOptions {
  createIfNotExist: boolean;
}

export async function ensureCwd(
  root: string,
  options?: EnsureCwdOptions
): Promise<string> {
  const { createIfNotExist } = options || {};
  const cwd = root ? resolve(root) : process.cwd();

  // Ensure target directory exists.
  try {
    if (!(await pathExists(cwd))) {
      if (createIfNotExist) await ensureDir(cwd);
      else {
        logger.error(`Directory ${cwd} does not exist`);
        process.exit(1);
      }

      return cwd;
    }
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }

  return cwd;
}
