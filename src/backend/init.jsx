import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeFile,
} from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";

export const createDataFolder = async (callback = () => {}) => {
  try {
    await createDir("data", {
      dir: BaseDirectory.AppLocalData,
      recursive: true,
    });
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const WriteJsonBox = async (callback = () => {}) => {
  try {
    const jsonBox = await resolveResource("resources/box.json");
    console.log(jsonBox);
    await writeFile(
      {
        contents: await readTextFile(jsonBox),
        path: "data/data.json",
      },
      {
        dir: BaseDirectory.AppLocalData,
        recursive: true,
      }
    );
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const ReadJsonBox = async () => {
  try {
    console.log;
    const jsonBox = await resolveResource("resources/box.json");
    return JSON.parse(await readTextFile(jsonBox));
  } catch (e) {
    console.error(e);
    return {};
  }
};
