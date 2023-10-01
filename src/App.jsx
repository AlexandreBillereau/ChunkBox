import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import LeitnerBox from "./leitnerBox";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { createDataFolder } from "./backend/init";
import { ReadJsonBox } from "./backend/ioBox";

const App = () => {
  const [boxs, setBoxes] = useState([]);

  useEffect(() => {
    //init the app
    createDataFolder(async () => {
      const jsonBox = await ReadJsonBox();
      console.log(jsonBox);
    });
  }, []);
  //load all box one computer
  const fakeBox = [
    { title: "LeetCode", review: 2, day: 2, learned: 0 },
    { title: "Math 1001", review: 5, day: 4, learned: 0 },
  ];

  return (
    <>
      {boxs}
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
            {fakeBox.map((boxLink, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col w-100 navLink p-4 lt-border-black cursor-pointer"
                >
                  <span className="text-[25px] europa-bold">
                    {boxLink.title}
                  </span>
                  <span className="text-[15px] euro-style -mt-2">
                    {boxLink.review} to review
                  </span>
                  <div className="flex mt-2 -ml-1">
                    <span>🔥 Day : {boxLink.day} </span>
                    <span className="ml-[21px]">
                      💯 Learned : {boxLink.learned}{" "}
                    </span>
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="flex justify-center">
            <button className="button-new-box primary-bg europa-bold mt-5 w-[200px] px-[41px] py-[16px] rounded-[5px] text-[25px]">
              NEW BOX
            </button>
          </div>
        </div>
        <LeitnerBox></LeitnerBox>
        {/* content here */}
      </div>
    </>
  );
};

export default App;
