import fse from "fs-extra";
import { resolveConfig, format } from "prettier";

interface FormatFilesWithPrettierOptions {
  files: string[];
}

export async function formatFilesWithPrettier({
  files,
}: FormatFilesWithPrettierOptions) {
  // format all files
  let formattedFiles = [];
  let options;

  for (let file of files) {
    const text = await fse.readFile(file, "utf8");

    if (!options) options = await resolveConfig(file);

    const formatted = await format(text, {
      ...options,
      parser: "babel",
    });

    formattedFiles.push(fse.outputFile(file, formatted));
  }

  return Promise.all(formattedFiles);
}
