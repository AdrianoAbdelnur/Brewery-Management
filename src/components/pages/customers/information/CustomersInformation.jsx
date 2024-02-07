import React, { useContext, useEffect } from "react";
import "./CustomersInformation.css";
import { CustomersContext } from "../../../../contexts/CustomersContext";
import { Table } from "../../../table/Table";

export const CustomersInformation = () => {
  const { state, getAllCustomers } = useContext(CustomersContext);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const columns = [
    {
      field: "barName",
      headerName: "Bar name",
      editable: true,
      width: 200,
    },
    {
      field: "barManager",
      headerName: "Manager",
      editable: true,
      width: 150,
    },
    {
      field: "owner",
      headerName: "Owner",
      editable: true,
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      editable: true,
      width: 450,
    },
  ];

  const rows = state.customers;
  return (
    <div className="costumersInfo">
      <Table columns={columns} rows={rows} />
    </div>
    /* </div> */
  );
};
