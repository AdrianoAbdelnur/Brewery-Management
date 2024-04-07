import React, { useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../components/pages/login/Login";
import { Main } from "../components/pages/main/Main";
import { CustomersInformation } from "../components/pages/customers/information/CustomersInformation";
import { useDispatch, useSelector } from "react-redux";
import { checkTocken } from "../store/slices/auth/thunks";
import { BarrelPerCustomer } from "../components/pages/customers/barrelsDetails/BarrelPerCustomer";
import { NewPay } from "../components/pages/customers/newPay/NewPay";
import { InformationStatus } from "../components/pages/barrels/infotmationStatus/InformationStatus";
import { ProductStock } from "../components/pages/products/productStock/ProductStock";
import { BeerStyles } from "../components/pages/products/beerStyles/BeerStyles";
import { Prices } from "../components/pages/products/prices/Prices";

export const Router = () => {
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
                <Route
                  path="/barrelPerCustomer"
                  element={<BarrelPerCustomer />}
                />
                <Route
                  path="/customersInfo"
                  element={<CustomersInformation />}
                />
                <Route path="/newPay" element={<NewPay />} />
                <Route path="/infoStatus" element={<InformationStatus />} />
                <Route path="/productStock" element={<ProductStock />} />
                <Route path="/beerStyles" element={<BeerStyles />} />
                <Route path="/prices" element={<Prices />} />
              </Routes>
            </PrivateRoutes>
          }
        />
      </Routes>
    </Layout>
  );
};
