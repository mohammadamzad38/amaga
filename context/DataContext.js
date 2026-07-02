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
      mode = "recent",
      select,
      search,
      filter,
      expand,
      orderby = "id desc",
      top = 4,
      skip = 0,
      tagId,
    } = query;

    if (!type) {
      throw new Error("type is required.");
    }

    const finalFilter =
      filter !== undefined ? filter : (filters?.[mode]?.[type] ?? "");

    const payload = {
      type,
      select,
      search,
      filter: finalFilter,
      expand,
      orderby,
      top,
      skip,
      tagId,
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
