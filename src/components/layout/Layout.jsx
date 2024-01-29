import React from "react";
import { Header } from "./header/Header";
import "./layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout_container">
      <Header />
      {children}
    </div>
  );
};
