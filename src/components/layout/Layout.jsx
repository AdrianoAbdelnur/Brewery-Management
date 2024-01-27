import React from "react";
import { Header } from "./header/Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
