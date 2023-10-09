import { useEffect } from "react";
import { getQuestionToReview } from "../backend/date.utils";

const Review = ({ box, updateCurrentBox = () => {} }) => {
  //todo : update question with new date onClick
  //todo : pass next question onClick (state?)
  //

  useEffect(() => {
    console.log(getQuestionToReview(box));
  }, []);

  return <p></p>;
};
export default Review;
