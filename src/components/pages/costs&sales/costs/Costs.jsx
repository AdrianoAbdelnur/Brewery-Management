import React, { useEffect } from "react";
import "./costs.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { Button } from "@mui/material";
import { AddCostModal } from "../../../modals/AddCostModal";
import { useState } from "react";
import { Table } from "../../../table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCosts } from "../../../../store/slices/costs/thunks";
import { format } from "date-fns";

export const Costs = () => {
  const { costs } = useSelector((state) => state.costs);
  const dispatch = useDispatch();
  const [showAddCostModal, setShowAddCostModal] = useState(false);

  useEffect(() => {
    if (!costs.lenght) {
      dispatch(getAllCosts());
    }
  }, []);

  useEffect(() => {
    console.log(costs);
  }, [costs]);

  const handleClose = () => {
    setShowAddCostModal(false);
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      editable: true,
      width: 120,
      hideable: false,
    },
    {
      field: "date",
      headerName: "Date",
      editable: true,
      width: 200,
      hideable: false,
    },
    {
      field: "item",
      headerName: "Item",
      editable: true,
      width: 250,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      editable: true,
      width: 200,
    },
    {
      field: "costCenter",
      headerName: "Cost Center",
      width: 200,
    },
    {
      field: "cost",
      headerName: "cost",
      editable: true,
      width: 250,
    },
  ];

  const rows = costs.map((cost, index) => {
    return {
      _id: cost._id,
      index: index + 1,
      date: format(cost.date, "dd-MM-yyyy"),
      item: cost.item,
      supplier: cost.supplier,
      cost: cost.cost,
      costCenter: cost.costCenter,
    };
  });

  return (
    <div className="costs_container">
      <BackArrow />
      <div className="addCust_Button_container">
        <Button
          className="AddCust_Button"
          variant="contained"
          onClick={() => setShowAddCostModal(true)}
        >
          Add New Cost
        </Button>
      </div>
      <Table columns={columns} rows={rows} />
      <AddCostModal show={showAddCostModal} handleClose={handleClose} />
    </div>
  );
};
