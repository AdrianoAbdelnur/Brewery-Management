import { createContext, useEffect, useReducer, useState } from "react";
export const CustomersContext = createContext();

import React from "react";
import { CustomersReducer } from "../reducers/CustomersReducer";
import { clientAxios } from "../api/ClientAxios";
import { types } from "../types/types";

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
        type: types.customers.getCustomers,
        payload: { customers: clientsList },
      });
    }
  };

  const addCustomer = async (clientData) => {
    try {
      const { data } = await clientAxios.post("/client/addClient", clientData);
      const { newClient } = data;
      dispatch({
        type: types.customers.addCustomer,
        payload: newClient,
      });
    } catch (error) {
      if (error.response.data.message === "The bar's name is alredy in use") {
        console.log(error.response.data.clientFound._id);
      }
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await clientAxios.put(
        "http://localhost:4000/api/client/deleteCustomer/" + id
      );
      const updatedCustomers = state.customers.filter((customer) => {
        return customer._id !== id;
      });
      dispatch({
        type: types.customers.deleteCustomer,
        payload: updatedCustomers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editCustomer = async (id, payload) => {
    try {
      const { data } = await clientAxios.put(
        "http://localhost:4000/api/client/updateCustomer/" + id,
        payload
      );
      const updatedCustomers = state.customers.map((customer) => {
        if (customer._id === id) {
          return data.updatedCustomer;
        }
        return customer;
      });
      dispatch({
        type: types.customers.editCustomer,
        payload: updatedCustomers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomersContext.Provider
      value={{
        state,
        getAllCustomers,
        addCustomer,
        deleteCustomer,
        editCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
