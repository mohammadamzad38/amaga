import { createContext } from "react";

export const popupContext = createContext();

export function PopUpContext({ children }) {
  const value = {};
  return (
    <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>
  );
}
