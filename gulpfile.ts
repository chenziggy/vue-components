import { resolve, join } from "path";
import { parallel } from "gulp";
import { copyFile, rename } from "fs/promises";

export const projRoot = resolve(__dirname, ".", ".", ".");

const buildOutput = resolve(projRoot, "dist");
const buildModuleOutput = resolve(buildOutput, "es");

const copyFiles = () => {
  return copyFile("package.json", join(buildOutput, "package.json"));
};

const renameFiles = () => {
  return rename(
    join(buildModuleOutput, "style.css"),
    join(buildOutput, "style.css")
  );
};

export default parallel(copyFiles, renameFiles);
