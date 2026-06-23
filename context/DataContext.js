"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { allPost } from "@/lib/api";
import { filters } from "@/lib/dataFilter";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const cache = useRef({});
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllPosts = useCallback(async (type = "fiber", mode = "recent") => {
    const key = `${type}-${mode}`;

    if (cache.current[key]) {
      setPosts(cache.current[key].results);
      setMeta(cache.current[key].meta);
      return;
    }
    setLoading(true);

    const filter = filters?.[mode]?.[type] || "";

    const result = await allPost({
      type,
      filter,
      top: 4,
      skip: 0,
    });

    if (!result.error) {
      cache.current[key] = {
        results: result?.data?.results || [],
        meta: result?.data?.meta || null,
      };

      setPosts(cache.current[key].results);
      setMeta(cache.current[key].meta);
    }

    setLoading(false);
  }, []);

  return (
    <DataContext.Provider value={{ posts, meta, loading, getAllPosts }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }

  return context;
}
