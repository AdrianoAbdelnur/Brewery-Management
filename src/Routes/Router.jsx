import React, { useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../components/pages/login/Login";
import { Main } from "../components/pages/main/Main";
import { Barrels } from "../components/pages/barrels/Barrels";
import { CustomersInformation } from "../components/pages/customers/information/CustomersInformation";
import { useDispatch, useSelector } from "react-redux";
import { checkTocken } from "../store/slices/auth/thunks";

export const Router = () => {
  /* const { state, checkToken } = useContext(AuthContext); */
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTocken());
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
