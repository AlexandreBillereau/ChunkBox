import { useContext, useEffect, useState } from "react";
import LeitnerBox from "./leitnerBox";
import { createDataFolder } from "./backend/init";
import { createBox, readJsonBox } from "./backend/ioBox";
import { setGlobalState, useGlobalState } from "./states/states";
import { boxsContext } from "./provider";
import { getQuestionToReview, howManyToReview } from "./backend/date.utils";

const App = () => {
  const {
    boxs,
    setBoxs,
    currentBoxIndex,
    setCurrentBoxIndex,
    updateCurrentBox,
  } = useContext(boxsContext);

  useEffect(() => {
    //init the app
    createDataFolder(async () => {
      const jsonBox = await readJsonBox();
      setBoxs(jsonBox.boxs);
    });
  }, []);

  useEffect(() => {}, [boxs]);

  return (
    <div className="flex">
      <div className="flex flex-col white-bg h-[100vh] w-[330px]">
        <div className="flex flex-col p-4">
          <h1 className="europa-bold tracking-wide black-text">Chunk Box</h1>
          <h2 className="euro-style accent-text -mt-2">by ChunkLab</h2>
          <h6 className="euro-style black-text -mt-2 mb-[20px]">
            Mastering your subject 🔥🔥🔥
          </h6>
        </div>
        <nav className="flex flex-col max-h-[700px] overflow-y-auto">
          {boxs.map((_box, index) => {
            return (
              <div
                onClick={() => {
                  setCurrentBoxIndex(index);
                  setGlobalState("boxPage", "start");
                }}
                key={index}
                className={`flex flex-col w-100 p-4 lt-border-black cursor-pointer ${
                  currentBoxIndex == index ? "navLinkActive" : "navLink"
                } `}
              >
                <span className="text-[25px] europa-bold">{_box.title}</span>
                <span className="text-[15px] euro-style -mt-2">
                  {howManyToReview(_box)} to review
                </span>
                <div className="flex mt-2 -ml-1">
                  <span>🔥Day : {_box.days} </span>
                  <span className="ml-[21px]">
                    💯 Learned : {_box.learned}{" "}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              await createBox();
              const boxListToUpdate = await readJsonBox();
              setBoxs(boxListToUpdate.boxs);
            }}
            className="button-new-box primary-bg europa-bold mt-5 w-[200px] px-[41px] py-[16px] rounded-[5px] text-[25px]"
          >
            NEW BOX
          </button>
        </div>
      </div>
      {/* Todo: ternary and honme page */}
      {boxs.length && (
        <LeitnerBox
          box={boxs[currentBoxIndex]}
          updateCurrentBox={updateCurrentBox}
        ></LeitnerBox>
      )}
      {/* content here */}
    </div>
  );
};

export default App;
