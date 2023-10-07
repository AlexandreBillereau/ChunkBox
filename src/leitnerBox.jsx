import { useState } from "react";
import QuestionNav from "./components/questionNav";
import Start from "./components/start";

const LeitnerBox = ({ box, updateBox = () => {} }) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  return (
    <>
      <section className="w-[100%] h-[100vh] flex flex-col">
        <div className="top# secondary-bg flex pt-[20px] headerBox">
          <div className="level# flex flex-col ">
            <div className="flex items-center pl-[47px] mb-[6px]">
              <span className="euro-style black-text text-[30px] mr-4">
                Level
              </span>
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.7201 17.0199V30.7201M30.7201 30.7201H17.0199M30.7201 30.7201L14.2799 14.2799"
                  stroke="#433BFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex pl-[47px] mb-[24px]">
              {box.level.map((level, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentLevel(index);
                    }}
                    className={`lt-level-box ${
                      currentLevel == index ? "lt-level-box-current" : ""
                    } flex flex-col w-[90px] h-[70px] mr-[15px] cursor-pointer`}
                  >
                    <span className="poppins text-[30px]">{level.id}</span>
                    <span className="euro-style text-[15px] -mt-1">
                      complete
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Learned# flex flex-col ">
            <div className="flex items-center pl-[47px] mb-[6px]">
              <span className="euro-style black-text text-[30px] mr-4">
                Learned
              </span>
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.7201 17.0199V30.7201M30.7201 30.7201H17.0199M30.7201 30.7201L14.2799 14.2799"
                  stroke="#433BFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex pl-[47px] mb-[24px]">
              <div className="lt-learned-box flex flex-col justify-center items-center w-[90px] h-[70px] mr-[15px]">
                <span className="poppins text-[30px]">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[100%] w-[100%]">
          <QuestionNav></QuestionNav>
          <div className="flex flex-col  w-[100%] secondary-bg">
            <Start box={box} updateBox={updateBox}></Start>
          </div>
        </div>
      </section>
    </>
  );
};
export default LeitnerBox;
