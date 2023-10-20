import { basename, extname, resolve } from "node:path";
import { Project, ScriptTarget, ts } from "ts-morph";
import fse from "fs-extra";
import chalk from "chalk";

import { logger } from "../../../utils";

interface TransformTsToJsOptions {
  tsconfigPath: string;
  dest: string;
  files: string[];
}

export async function transformTsToJs({
  tsconfigPath,
  dest,
  files,
}: TransformTsToJsOptions) {
  if (!fse.existsSync(tsconfigPath)) {
    logger.error(
      `Could not find ${chalk.cyan("tsconfig.json")} file at ${tsconfigPath}.`
    );

    process.exit(1);
  }

  const tsProject = new Project({
    tsConfigFilePath: tsconfigPath,
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    compilerOptions: {
      target: ScriptTarget.ESNext,
      outDir: dest,
      jsx: ts.JsxEmit.Preserve,
    },
  });

  let totalTsFiles = 0;
  let filePromises = [];

  for (let file of files) {
    const filename = basename(file);
    const outFile = resolve(dest, filename);

    if ([".ts", ".tsx"].includes(extname(file))) {
      try {
        const fileContents = await fse.readFile(file, "utf-8");
        tsProject.createSourceFile(filename, fileContents);
        totalTsFiles++;
      } catch (e) {
        logger.error(``);
        logger.error(e);
      }
    } else {
      filePromises.push(fse.copy(file, outFile));
    }
  }

  if (totalTsFiles > 0) filePromises.push(tsProject.emit());

  return Promise.all(filePromises);
}
