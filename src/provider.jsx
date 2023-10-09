import { createContext, useState } from "react";

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
