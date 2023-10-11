import {
  BaseDirectory,
  createDir,
  readTextFile,
  removeFile,
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

/**
 * @description create new question in current box at level 1
 * @returns current box with new question.
 */
export const IOcreateQuestion = async (boxId, title, question, answer) => {
  const boxObj = await readJsonBox();
  const currentIndex = boxObj["boxs"].findIndex((elem) => elem.id == boxId);
  const date = new Date("2023-10-10T18:39:13");
  date.setHours(0, 0, 0, 0);
  boxObj.boxs[currentIndex].level[0].questions.push({
    title,
    question,
    answer,
    date: date,
  });
  await removeFile("data/data.json", { dir: BaseDirectory.AppLocalData });
  await writeTextFile(
    { contents: JSON.stringify(boxObj), path: "data/data.json" },
    { dir: BaseDirectory.AppLocalData }
  );
  return boxObj.boxs[currentIndex];
};

export const IOchangeQuestionLvl = async (
  boxId,
  question,
  levelId,
  levelUpdate
) => {
  const boxObj = await readJsonBox();
  const currentIndex = boxObj["boxs"].findIndex((elem) => elem.id == boxId);
  const indexOfquestion = boxObj.boxs[currentIndex].level[
    levelId - 1
  ].questions.findIndex((elem) => elem.title == question.title);

  if (levelUpdate == 1 && levelId == 1) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    boxObj.boxs[currentIndex].level[0].questions[indexOfquestion].date =
      currentDate;

    await removeFile("data/data.json", { dir: BaseDirectory.AppLocalData });
    await writeTextFile(
      { contents: JSON.stringify(boxObj), path: "data/data.json" },
      { dir: BaseDirectory.AppLocalData }
    );
    return boxObj.boxs[currentIndex];
  }

  boxObj.boxs[currentIndex].level[levelId - 1].questions.splice(
    indexOfquestion,
    1
  );

  if (levelUpdate > 7) {
    boxObj.boxs[currentIndex].learned += 1;
    console.log(boxObj.boxs[currentIndex]);
    await removeFile("data/data.json", { dir: BaseDirectory.AppLocalData });
    await writeTextFile(
      { contents: JSON.stringify(boxObj), path: "data/data.json" },
      { dir: BaseDirectory.AppLocalData }
    );
    return boxObj.boxs[currentIndex];
  }

  const dateUpdate = new Date();
  dateUpdate.setHours(0, 0, 0, 0);
  const questionUpdate = { ...question, date: dateUpdate };
  console.log(questionUpdate);
  boxObj.boxs[currentIndex].level[levelUpdate - 1].questions.push(
    questionUpdate
  );
  await removeFile("data/data.json", { dir: BaseDirectory.AppLocalData });
  await writeTextFile(
    { contents: JSON.stringify(boxObj), path: "data/data.json" },
    { dir: BaseDirectory.AppLocalData }
  );
  return boxObj.boxs[currentIndex];
};

export const IOupdateBoxName = async (boxId, boxName) => {
  const boxObj = await readJsonBox();
  const currentIndex = boxObj["boxs"].findIndex((elem) => elem.id == boxId);
  boxObj.boxs[currentIndex].title = boxName;
  console.log(boxObj.boxs[currentIndex]);
  await removeFile("data/data.json", { dir: BaseDirectory.AppLocalData });
  await writeTextFile(
    { contents: JSON.stringify(boxObj), path: "data/data.json" },
    { dir: BaseDirectory.AppLocalData }
  );
  return boxObj.boxs[currentIndex];
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
