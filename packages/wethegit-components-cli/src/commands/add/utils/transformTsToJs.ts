import { basename, extname, resolve } from "node:path";
import { Project, ScriptTarget, ts } from "ts-morph";
import fse from "fs-extra";

import { logger } from "../../../utils";

interface TransformTsToJsOptions {
  cwd: string;
  destDir: string;
  files: string[];
}

/**
 * Transforms ts files to js files. If a file is not a ts file, it will be copied directly.
 */
export async function transformTsToJs({
  cwd,
  destDir,
  files,
}: TransformTsToJsOptions) {
  const defaultTsConfigPath = resolve(cwd, "./tsconfig.json");
  const isThereATsConfig = await fse.pathExists(defaultTsConfigPath);

  await fse.ensureDir(destDir);

  const tsProject = new Project({
    ...(isThereATsConfig
      ? { tsConfigFilePath: defaultTsConfigPath }
      : { undefined }),
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    compilerOptions: {
      target: ScriptTarget.ESNext,
      outDir: destDir,
      jsx: ts.JsxEmit.Preserve,
      declaration: true,
      declarationDir: resolve(cwd, "types"),
    },
  });

  let totalTsFiles = 0;
  let filePromises = [];

  for (let file of files) {
    const filename = basename(file);
    const outFile = resolve(destDir, filename);

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
      // copy file directly if not a ts file
      filePromises.push(fse.copy(file, outFile));
    }
  }

  if (totalTsFiles > 0) filePromises.push(tsProject.emit());

  return Promise.all(filePromises);
}
