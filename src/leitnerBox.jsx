import { useEffect, useState } from "react";
import QuestionNav from "./components/questionNav";
import Start from "./components/start";
import { setGlobalState, useGlobalState } from "./states/states";
import CreateQuestion from "./components/createQuestion";
import Review from "./components/review";
import { getQuestionToReview } from "./backend/date.utils";

const LeitnerBox = ({ box, updateCurrentBox = () => {} }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [boxPage] = useGlobalState("boxPage");
  const [questionsToReview, setQuestionsToReview] = useState(
    getQuestionToReview(box)
  );

  useEffect(() => {
    setQuestionsToReview(getQuestionToReview(box));
  }, [box]);

  const renderPage = () => {
    if (boxPage == "start") {
      return <Start box={box} updateCurrentBox={updateCurrentBox}></Start>;
    }
    if (boxPage == "create") {
      return (
        <CreateQuestion
          box={box}
          updateCurrentBox={updateCurrentBox}
        ></CreateQuestion>
      );
    }
    if (boxPage == "play") {
      return (
        <Review
          box={box}
          updateCurrentBox={updateCurrentBox}
          questionsToReview={questionsToReview}
        ></Review>
      );
    }
  };

  return (
    <>
      <section className="w-[100%] h-[100vh] flex flex-col overflow-y-auto">
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
              {questionsToReview.map((question, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentLevel(index);
                      setGlobalState("boxPage", "start");
                    }}
                    className={`lt-level-box ${
                      currentLevel == index ? "lt-level-box-current" : ""
                    } flex flex-col w-[90px] h-[70px] mr-[15px] cursor-pointer`}
                  >
                    <span className="poppins text-[30px]">
                      {question.level}
                    </span>
                    <span className="euro-style text-[15px] -mt-1">
                      {question.toReview.length > 0
                        ? `${question.toReview.length} to review`
                        : "complete"}
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
          <QuestionNav currentLevel={box.level[currentLevel]}></QuestionNav>
          <div className="flex flex-col  w-[100%] secondary-bg">
            {renderPage()}
          </div>
        </div>
      </section>
    </>
  );
};
export default LeitnerBox;
