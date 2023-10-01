import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeFile,
  exists,
} from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";

export const createDataFolder = async (callback = () => {}) => {
  try {
    await createDir("data", {
      dir: BaseDirectory.AppLocalData,
      recursive: true,
    });
    if (
      !(await exists("data/data.json", { dir: BaseDirectory.AppLocalData }))
    ) {
      await writeFile(
        { path: "data/data.json", contents: '{"boxs" : {}}' },
        { dir: BaseDirectory.AppLocalData }
      );
    }
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const WriteJsonBox = async (callback = () => {}) => {
  try {
    //this line dont do good thing refcator
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
