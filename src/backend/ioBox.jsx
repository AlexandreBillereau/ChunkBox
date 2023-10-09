import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import {
  appLocalDataDir,
  localDataDir,
  resolveResource,
} from "@tauri-apps/api/path";

export const readJsonBox = async () => {
  try {
    console.log("Read base directory: ", await appLocalDataDir());
    return JSON.parse(
      await readTextFile("data/data.json", { dir: BaseDirectory.AppLocalData })
    );
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const IOcreateQuestion = async (boxId, title, question, answer) => {
  const boxObj = await readJsonBox();
  const currentIndex = boxObj["boxs"].findIndex((elem) => elem.id == boxId);
  boxObj.boxs[currentIndex].level[0].questions.push({
    title,
    question,
    answer,
    data: new Date(),
  });
  await writeTextFile(
    { contents: JSON.stringify(boxObj), path: "data/data.json" },
    { dir: BaseDirectory.AppLocalData }
  );
  return boxObj;
};

export const createBox = async () => {
  try {
    const boxObj = await readJsonBox();
    boxObj["boxs"].push({
      id: boxObj["boxs"].length + 1,
      title: "new box",
      review: false,
      days: 0,
      learned: 0,
      level: [
        {
          id: 1,
          questions: [],
        },
        {
          id: 2,
          questions: [],
        },
        {
          id: 3,
          questions: [],
        },
        {
          id: 4,
          questions: [],
        },
        {
          id: 5,
          questions: [],
        },
        {
          id: 6,
          questions: [],
        },
        {
          id: 7,
          questions: [],
        },
      ],
    });
    await writeTextFile(
      { contents: JSON.stringify(boxObj), path: "data/data.json" },
      { dir: BaseDirectory.AppLocalData }
    );
  } catch (e) {
    console.error(e);
  }
};
