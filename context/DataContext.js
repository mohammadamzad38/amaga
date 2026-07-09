"use client";

import { createContext, useCallback, useContext, useRef } from "react";
import { allPost } from "@/lib/api";
import { filters } from "@/lib/defaultFilter";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const cache = useRef({});

  const pending = useRef({});

  const getAllPosts = useCallback(async (query = {}) => {
    const {
      type,
      tagId,
      select,
      search,
      filter,
      expand,
      tagIds,
      top = 4,
      skip = 0,
      category,
      mode = "recent",
      orderby = "id desc",
    } = query;

    if (!type) {
      throw new Error("type is required.");
    }

    const finalFilter =
      filter !== undefined ? filter : (filters?.[mode]?.[type] ?? "");

    const payload = {
      top,
      skip,
      type,
      tagId,
      tagIds,
      search,
      expand,
      select,
      orderby,
      category,
      filter: finalFilter,
    };

    const key = JSON.stringify(payload);

    if (cache.current[key]) {
      return cache.current[key];
    }

    if (pending.current[key]) {
      return pending.current[key];
    }

    pending.current[key] = (async () => {
      try {
        const result = await allPost(payload);

        if (!result.error) {
          cache.current[key] = result;
        }

        return result;
      } finally {
        delete pending.current[key];
      }
    })();

    return pending.current[key];
  }, []);

  const clearPostCache = useCallback(() => {
    cache.current = {};
    pending.current = {};
  }, []);

  return (
    <DataContext.Provider
      value={{
        getAllPosts,
        clearPostCache,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }

  return context;
}
