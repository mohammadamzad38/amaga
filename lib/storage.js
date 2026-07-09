"use client";

import { useState } from "react";

export default function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;

    const stored = localStorage.getItem(key);

    if (stored === null) return defaultValue;

    try {
      return JSON.parse(stored);
    } catch {
      return stored;
    }
  });

  const setStoredValue = (newValue) => {
    const valueToStore =
      typeof newValue === "function" ? newValue(value) : newValue;

    setValue(valueToStore);

    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  const clear = () => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  };

  return [value, setStoredValue, clear];
}
