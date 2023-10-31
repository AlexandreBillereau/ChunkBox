import { useState, useEffect } from "react";
import DbChunkBox from "./db";

export function useDb(): DbChunkBox | null {
  const [db, setDb] = useState(null);

  useEffect(() => {
    (async () => {
      const instance = await DbChunkBox.getInstance();
      setDb(instance);
    })();
  }, []);

  return db;
}
