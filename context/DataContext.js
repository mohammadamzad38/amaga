"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { allPost } from "@/lib/api";
import { filters } from "@/lib/dataFilter";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllPosts = useCallback(async (type = "fiber", mode = "recent") => {
    setLoading(true);

    const filter = filters?.[mode]?.[type] || "";

    const result = await allPost({
      type,
      filter,
      top: 4,
      skip: 0,
    });

    if (!result.error) {
      setPosts(result?.data?.results || []);
      setMeta(result?.data?.meta || null);
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
