import React from "react";
import { Layout } from "../components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<>Home</>} />
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isLogged={false}>
              <Routes>
                <Route path="/login" element={<>Login</>} />
                <Route path="/register" element={<>register</>} />
              </Routes>
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isLogged={true}>
              <Routes>
                <Route path="/main" element={<>Main</>} />
              </Routes>
            </PrivateRoutes>
          }
        />
      </Routes>
    </Layout>
  );
};
