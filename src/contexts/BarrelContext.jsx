import { createContext } from "react";
export const BarrelContext = createContext();

import React from "react";

const BarrelProvider = ({ children }) => {
  return (
    <BarrelContext.Provider value={"barrel"}>{children}</BarrelContext.Provider>
  );
};

export default BarrelProvider;
