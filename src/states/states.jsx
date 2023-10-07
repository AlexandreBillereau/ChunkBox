import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  boxPage: "start",
});

export { useGlobalState, setGlobalState };
