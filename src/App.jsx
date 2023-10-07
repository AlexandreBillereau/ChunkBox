import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import LeitnerBox from "./leitnerBox";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { createDataFolder } from "./backend/init";
import { createBox, readJsonBox } from "./backend/ioBox";
import { Button, Form, Input, Modal } from "antd";

const App = () => {
  const [boxs, setBoxs] = useState([]);
  const [currentBox, setCurrentBox] = useState(0);

  useEffect(() => {
    //init the app
    createDataFolder(async () => {
      const jsonBox = await readJsonBox();
      console.log(jsonBox);
      setBoxs(jsonBox.boxs);
    });
  }, []);

  const updateCurentBox = (box) => {
    //Update the boxs to re-render component
    const boxsUpdate = [...boxs];
    console.log("from app.jsx", box);
    boxsUpdate[currentBox] = box;
    setBoxs(boxsUpdate);
    //write the boxs into file
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col white-bg h-[100vh] w-[330px]">
          <div className="flex flex-col p-4">
            <h1 className="europa-bold tracking-wide black-text">
              Leitner Box
            </h1>
            <h2 className="euro-style accent-text -mt-2">ChunkLab</h2>
            <h6 className="euro-style black-text -mt-2 mb-[20px]">
              Mastering your subject 🔥🔥🔥
            </h6>
          </div>
          <nav className="flex flex-col max-h-[700px] overflow-y-auto">
            {boxs.map((_box, index) => {
              return (
                <div
                  onClick={() => {
                    setCurrentBox(index);
                  }}
                  key={index}
                  className={`flex flex-col w-100 p-4 lt-border-black cursor-pointer ${
                    currentBox == index ? "navLinkActive" : "navLink"
                  } `}
                >
                  <span className="text-[25px] europa-bold">{_box.title}</span>
                  <span className="text-[15px] euro-style -mt-2">
                    {_box.review} to review
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
                console.log(boxListToUpdate);
                setBoxs(boxListToUpdate.boxs);
              }}
              className="button-new-box primary-bg europa-bold mt-5 w-[200px] px-[41px] py-[16px] rounded-[5px] text-[25px]"
            >
              NEW BOX
            </button>
          </div>
        </div>
        {boxs.length && (
          <LeitnerBox
            box={boxs[currentBox]}
            updateBox={updateCurentBox}
          ></LeitnerBox>
        )}
        {/* content here */}
      </div>
    </>
  );
};

export default App;
