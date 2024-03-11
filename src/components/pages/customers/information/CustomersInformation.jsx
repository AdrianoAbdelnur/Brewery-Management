import React, { useEffect, useState } from "react";
import "./CustomersInformation.css";
import { Table } from "../../../table/Table";
import { Button } from "@mui/material";
import { AddCustomerModal } from "../../../modals/AddCustomerModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../../../store/slices/customers/thunks";
import { useDispatch, useSelector } from "react-redux";

export const CustomersInformation = () => {
  const { customers, isLoading } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setCustomerToEdit(null);
    setShowModal(false);
  };

  const handleDelete = (id) => () => {
    dispatch(deleteCustomer(id));
  };

  const handleEdit = (id) => () => {
    setCustomerToEdit(customers.find((customer) => customer._id === id));
    handleOpen();
  };

  const columns = [
    {
      field: "barName",
      headerName: "Bar name",
      editable: true,
      width: 200,
      hideable: false,
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
      width: 480,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon color="primary" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEdit(id)}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteForeverIcon color="error" />}
            label="Delete"
            onClick={handleDelete(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  const rows = customers;

  return (
    <div className="costumersInfo">
      <div className="backButton_container">
        <Button onClick={() => navigate("/main")} className="backButton">
          <ArrowBackIcon />
          back
        </Button>
      </div>
      <div className="addCust_Button_container">
        <Button
          className="AddCust_Button"
          variant="contained"
          onClick={handleOpen}
        >
          Add New Customer
        </Button>
      </div>
      {rows[0]?.barName ? (
        <Table columns={columns} rows={rows} />
      ) : (
        <CircularProgress color="primary" size={80} thickness={6} />
      )}

      <AddCustomerModal
        show={showModal}
        handleClose={handleClose}
        customertoEdit={customerToEdit}
      />
    </div>
  );
};
