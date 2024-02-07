import React, { useContext, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../components/pages/login/Login";
import { AuthContext } from "../contexts/AuthContext";
import { Main } from "../components/pages/main/Main";
import { Barrels } from "../components/pages/barrels/Barrels";
import { CustomersInformation } from "../components/pages/customers/information/CustomersInformation";

export const Router = () => {
  const { state, checkToken } = useContext(AuthContext);
  const { isLogged } = state;

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<>Home</>} />
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isLogged={isLogged}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<>register</>} />
              </Routes>
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isLogged={isLogged}>
              <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/barrels" element={<Barrels />} />
                <Route
                  path="/customersInfo"
                  element={<CustomersInformation />}
                />
              </Routes>
            </PrivateRoutes>
          }
        />
      </Routes>
    </Layout>
  );
};
