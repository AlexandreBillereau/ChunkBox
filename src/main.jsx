import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import BoxsProvider from "./provider";
import DbChunkBox from "./backend/db";
import { useDb } from "./backend/useDb";

const db = await DbChunkBox.getInstance();
db.initSqlite();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BoxsProvider>
      <App />
    </BoxsProvider>
  </React.StrictMode>
);
