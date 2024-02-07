import { createContext, useReducer } from "react";
export const CustomersContext = createContext();

import React from "react";
import { CustomersReducer } from "../reducers/CustomersReducer";
import { clientAxios } from "../api/ClientAxios";

const CustomersProvider = ({ children }) => {
  const initialCustomersValues = {
    customers: [],
    alerMsg: "",
  };
  const [state, dispatch] = useReducer(
    CustomersReducer,
    initialCustomersValues
  );

  const getAllCustomers = async () => {
    const { data } = await clientAxios("/client/getClients");
    const { clientsList } = data;
    if (clientsList) {
      dispatch({
        type: "GETALL-COSTUMERS",
        payload: { customers: clientsList },
      });
    }
  };
  return (
    <CustomersContext.Provider value={{ state, getAllCustomers }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
