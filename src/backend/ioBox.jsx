import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeFile,
} from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";

export const ReadJsonBox = async () => {
  try {
    return JSON.parse(
      await readTextFile("data/data.json", { dir: BaseDirectory.AppLocalData })
    );
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const createBox = async () => {};
