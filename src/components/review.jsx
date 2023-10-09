import { useEffect } from "react";
import { getQuestionToReview } from "../backend/date.utils";

const Review = ({
  box,
  updateCurrentBox = () => {},
  questionsToReview = [],
}) => {
  //todo : update question with new date onClick
  //todo : pass next question onClick (state?)
  //

  useEffect(() => {
    const questionToReviewFlatted = questionsToReview
      .map((elem) => {
        return elem.toReview;
      })
      .flat(Infinity);
    console.log(questionToReviewFlatted);
  }, [box]);

  return <p></p>;
};
export default Review;
