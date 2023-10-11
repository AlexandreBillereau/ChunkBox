import { useEffect, useState } from "react";
import { getQuestionToReview } from "../backend/date.utils";
import { IOchangeQuestionLvl } from "../backend/ioBox";

const Review = ({
  box,
  updateCurrentBox = () => {},
  questionsToReview = [],
}) => {
  const [isQuestionable, setIsQuestionable] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  //todo : update question with new date onClick
  //todo : pass next question onClick (state?)
  //
  // console.log(box);

  useEffect(() => {
    for (let i = 0; i < questionsToReview.length; i++) {
      const question = questionsToReview[i];
      if (question.toReview.length != 0) {
        setIsQuestionable(true);
        setCurrentQuestion(question.toReview[0]);
        setCurrentLevel(question.level);
        break;
      }
      setIsQuestionable(false);
    }

    //if question null print done
  }, [box]);

  const handleGoodAnswer = async () => {
    if (currentLevel + 1 > 7) {
      // increment learned
      return;
    }

    const boxUpdate = await IOchangeQuestionLvl(
      box.id,
      currentQuestion,
      currentLevel,
      currentLevel + 1
    );
    updateCurrentBox(boxUpdate);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100%] flex-col ">
        {isQuestionable ? (
          <>
            <div className="w-[600px] h-[500px] primary-bg rounded-[10px] flex flex-col overflow-y-auto question-container">
              <span className="europa-bold tracking-wide text-[30px] p-[30px]">
                {currentQuestion.title}
              </span>

              {!showAnswers ? (
                <div
                  className="p-[30px]"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                ></div>
              ) : (
                <div
                  className="p-[30px]"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.answer }}
                ></div>
              )}
            </div>
            <button
              className="button-new-box primary-bg europa-bold mt-5 w-[200px] px-[41px] py-[16px] rounded-[5px] text-[15px]"
              onClick={() => {
                setShowAnswers(!showAnswers);
              }}
            >
              show answer
            </button>
            <div className="flex">
              <button className="rounded-[9999px] w-[100px] h-[100px] accent-bg my-4 mx-[50px] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  handleGoodAnswer();
                }}
                className="rounded-[9999px] w-[100px] h-[100px] accent-bg my-4 mx-[50px] flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="europa-bold tracking-wide black-text">
              You finish ur day questions
            </h1>
          </div>
        )}
      </div>
    </>
  );
};
export default Review;
