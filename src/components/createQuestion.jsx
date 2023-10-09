import "trix/dist/trix.esm.min.js";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import { useContext, useRef } from "react";
import { IOcreateQuestion } from "../backend/ioBox";

import Title from "antd/es/skeleton/Title";

const CreateQuestion = ({ box, updateCurrentBox = () => {} }) => {
  const questionRef = useRef();
  const titleRef = useRef();
  const answerRef = useRef();

  return (
    <div className="h-[80vh] overflow-y-auto overflow-x-hidden">
      <div className="crt-title flex items-center w-fit h-fit cursor-pointer m-4 px-3 ">
        <h1 className="europa-bold tracking-wide black-text flex flex-col">
          Create Question
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-10 h-10 ml-5 mt-1 logo-create"
        >
          <path
            fillRule="evenodd"
            d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="crt-title flex items-center w-fit h-fit cursor-pointer m-4 px-2 ">
        <h2 className="europa-bold tracking-wide black-text flex flex-col">
          Title
        </h2>
      </div>
      <div className="p-4">
        <input
          ref={titleRef}
          className="pl-2 h-[40px] w-[100%] text-black euro-style bg-transparent border-solid border-[#05031570] border-[1px] rounded-[3px]"
        ></input>
      </div>
      <div className="crt-title flex items-center w-fit h-fit cursor-pointer m-4 px-2 ">
        <h2 className="europa-bold tracking-wide black-text flex flex-col">
          Question
        </h2>
      </div>
      <div className="p-4">
        <TrixEditor
          ref={questionRef}
          className="euro-style h-[300px] text-black"
        ></TrixEditor>
      </div>
      <div className="crt-title flex items-center w-fit h-fit cursor-pointer m-4 px-2 ">
        <h2 className="europa-bold tracking-wide black-text flex flex-col">
          Answer
        </h2>
      </div>
      <div className="p-4">
        <TrixEditor
          ref={answerRef}
          className="euro-style h-[300px] text-black overflow-y-auto"
        ></TrixEditor>
      </div>
      <div className="p-4 flex justify-end">
        <button
          onClick={async () => {
            const updatedBox = await IOcreateQuestion(
              box.id,
              titleRef.current.value,
              questionRef.current.container.innerHTML,
              answerRef.current.container.innerHTML
            );
            updateCurrentBox(updatedBox);
          }}
          className="btn-new-question europa-bold p-3 rounded-[10px] mt-[24px] primary-bg"
        >
          Save 🤗
        </button>
      </div>
    </div>
  );
};
export default CreateQuestion;
