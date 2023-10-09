import { createContext, useState } from "react";
import { getQuestionToReview } from "./backend/date.utils";

export const boxsContext = createContext();

export const BoxsProvider = ({ children }) => {
  const [boxs, setBoxs] = useState([]);
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);

  const updateCurrentBox = (box) => {
    const boxsUpdate = [...boxs];
    console.log("from provider: currentBoxIndex -> ", currentBoxIndex);
    boxsUpdate[currentBoxIndex] = box;
    setBoxs(boxsUpdate);
  };

  const updateQuestionToReview = (box) => {
    setQuestionToReview(getQuestionToReview(box));
  };

  return (
    <boxsContext.Provider
      value={{
        boxs,
        setBoxs,
        currentBoxIndex,
        setCurrentBoxIndex,
        updateCurrentBox,
      }}
    >
      {children}
    </boxsContext.Provider>
  );
};

export default BoxsProvider;
