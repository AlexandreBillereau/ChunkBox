import { createContext, useState } from "react";

export const boxsContext = createContext();

export const BoxsProvider = ({ children }) => {
  const [boxs, setBoxs] = useState([]);
  const [currentBox, setCurrentBox] = useState(0);

  const updateCurentBox = (box) => {
    const boxsUpdate = [...boxs];
    console.log("from app.jsx", box);
    boxsUpdate[currentBox] = box;
    setBoxs(boxsUpdate);
  };

  return (
    <boxsContext.Provider
      value={{ boxs, setBoxs, currentBox, setCurrentBox, updateCurentBox }}
    >
      {children}
    </boxsContext.Provider>
  );
};

export default BoxsProvider;
