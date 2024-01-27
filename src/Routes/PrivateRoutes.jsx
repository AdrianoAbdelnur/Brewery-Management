import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children, isLogged }) => {
  return isLogged ? children : <Navigate to="./auth/login" />;
};
