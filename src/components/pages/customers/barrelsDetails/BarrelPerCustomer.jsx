import React, { useEffect, useState } from "react";
import "./barrelPerCustomer.css";
import { Table } from "../../../table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../../../store/slices/customers/thunks";
import { getAllBarrels } from "../../../../store/slices/barrels/thunks";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DetailsBarrelsModal } from "../../../modals/DetailsBarrelsModal";
import { format } from "date-fns";
import { BackArrow } from "../../../backbutton/BackArrow";

export const BarrelPerCustomer = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const { barrels } = useSelector((state) => state.barrels);
  const [newCustomers, setNewCustomers] = useState([]);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailsRows, setDetailsRows] = useState([]);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getAllCustomers());
    }
    if (!barrels.length) {
      dispatch(getAllBarrels());
    }
  }, []);

  useEffect(() => {
    if ((customers[0], barrels[0])) {
      crossInfo();
    }
  }, [customers, barrels]);

  useEffect(() => {
    if (newCustomers[0]) {
      const customersDet = newCustomers.map((customer) => {
        return {
          _id: customer._id,
          details: "details",
          barName: customer.barName,
          fifty: customer.barrels.filter(
            (barrel) =>
              barrel.capacity === 50 &&
              barrel.statusBarrel === "delivered to customer"
          ).length,
          thirty: customer.barrels.filter(
            (barrel) =>
              barrel.capacity === 30 &&
              barrel.statusBarrel === "delivered to customer"
          ).length,
          twenty: customer.barrels.filter(
            (barrel) =>
              barrel.capacity === 20 &&
              barrel.statusBarrel === "delivered to customer"
          ).length,
          ten: customer.barrels.filter(
            (barrel) =>
              barrel.capacity === 10 &&
              barrel.statusBarrel === "delivered to customer"
          ).length,
          five: customer.barrels.filter(
            (barrel) =>
              barrel.capacity === 5 &&
              barrel.statusBarrel === "delivered to customer"
          ).length,
        };
      });
      setRows(customersDet);
    }
  }, [newCustomers]);

  const crossInfo = () => {
    var newCustomers = [];
    newCustomers = customers.map((customer) => {
      const barrelsPerCustomer = barrels.filter(
        (barrel) =>
          barrel?.customer?._id === customer._id &&
          barrel?.statusBarrel === "delivered to customer"
      );
      return {
        ...customer,
        barrels: barrelsPerCustomer,
      };
    });
    setNewCustomers(newCustomers);
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setDetailsRows([]);
    setShowModal(false);
  };

  const showDetails = (id) => () => {
    const details = newCustomers.find(
      (customer) => customer._id === id
    ).barrels;
    const rows = details.map((barrel, index) => {
      return {
        customer: barrel.customer.barName,
        _id: barrel._id,
        order: index + 1,
        cap: barrel.capacity,
        status: barrel.statusBarrel,
        deliDate: format(barrel.statusDate, "dd-MM-yyyy"),
        style: barrel.style.name,
      };
    });
    setDetailsRows(rows);
    handleOpen();
  };

  const columns = [
    {
      field: "barName",
      headerName: "Customer",
      width: 350,
      hideable: false,
    },
    {
      field: "fifty",
      type: "number",
      headerName: "50 liters",
      width: 150,
    },
    {
      field: "thirty",
      type: "number",
      headerName: "30 liters",
      width: 150,
    },
    {
      field: "twenty",
      type: "number",
      headerName: "20 liters",
      width: 150,
    },
    {
      field: "ten",
      type: "number",
      headerName: "10 liters",
      width: 150,
    },
    {
      field: "five",
      type: "number",
      headerName: "5 liters",
      width: 150,
    },
    {
      field: "details",
      type: "actions",
      headerName: "Details",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <>
            <GridActionsCellItem
              icon={<InfoOutlinedIcon color="info" />}
              label="details"
              className="textPrimary"
              onClick={showDetails(id)}
            />
          </>,
        ];
      },
    },
  ];
  return (
    <div className="barrelPerCustomer_container">
      <BackArrow />
      <Table columns={columns} rows={rows} /* cellsStyle="barrels" */ />
      <div>
        <DetailsBarrelsModal
          show={showModal}
          handleClose={handleClose}
          rows={detailsRows}
        />
      </div>
    </div>
  );
};
