import { extname, join, relative, resolve } from "node:path"

import type { EmitResult } from "ts-morph"
import { Project, ScriptTarget, ts } from "ts-morph"
import fse from "fs-extra"

import { logger } from "../../../utils"

interface TransformTsToJsOptions {
  cwd: string
  destDir: string
  srcDir: string
  files: string[]
}

/**
 * Transforms ts files to js files. If a file is not a ts file, it will be copied directly.
 */
export async function transformTsToJs({
  cwd,
  destDir,
  files,
  srcDir,
}: TransformTsToJsOptions): Promise<EmitResult[]> {
  const defaultTsConfigPath = resolve(cwd, "./tsconfig.json")
  const isThereATsConfig = await fse.pathExists(defaultTsConfigPath)

  await fse.ensureDir(destDir)

  const tsProject = new Project({
    ...(isThereATsConfig ? { tsConfigFilePath: defaultTsConfigPath } : {}),
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    compilerOptions: {
      target: ScriptTarget.ESNext,
      outDir: destDir,
      jsx: ts.JsxEmit.Preserve,
      declaration: false,
    },
  })

  const tsPromises = []
  const filePromises = []

  for (const file of files) {
    const relativePath = relative(srcDir, file)

    if ([".ts", ".tsx"].includes(extname(file))) {
      try {
        tsPromises.push(
          fse
            .readFile(file, "utf-8")
            .then((fileContents) =>
              tsProject.createSourceFile(join("/", relativePath), fileContents)
            )
        )
      } catch (e) {
        logger.error(``)
        logger.error(e)
      }
    } else {
      const outFile = resolve(destDir, "..", relativePath)

      // copy file directly if not a ts file
      filePromises.push(fse.copy(file, outFile))
    }
  }

  if (tsPromises.length)
    filePromises.push(Promise.all(tsPromises).then(() => tsProject.emit()))

  return Promise.all(filePromises)
}
