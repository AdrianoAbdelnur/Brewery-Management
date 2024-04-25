import React, { useEffect, useState } from "react";
import "./productions.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductions } from "../../../../store/slices/productions/thunks";
import { Table } from "../../../table/Table";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { AddProductionModal } from "../../../modals/AddProductionModal";

export const Productions = () => {
  const { productions } = useSelector((state) => state.productions);
  const dispatch = useDispatch();
  const [showAddProductionModal, setShowAddProductionModal] = useState(false);

  useEffect(() => {
    if (!productions.lenght) {
      dispatch(getAllProductions());
    }
  }, []);

  const addProduction = () => {
    setShowAddProductionModal(true);
  };

  const handleClose = () => {
    setShowAddProductionModal(false);
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      width: 400,
    },
    {
      field: "date",
      headerName: "Date",
      width: 400,
    },
    {
      field: "style",
      headerName: "style",
      editable: true,
      width: 400,
    },
  ];

  const rows = productions.map((production, index) => {
    return {
      _id: production._id,
      date: format(production.date, "dd-MM-yyyy"),
      style: production.style.name,
      index: index + 1,
    };
  });

  return (
    <div className="productions_container">
      <BackArrow />
      <div className="addProduction_container">
        <Button
          className="AddProduction_Button"
          variant="contained"
          onClick={addProduction}
        >
          Add production
        </Button>
      </div>
      <Table columns={columns} rows={rows} />
      <AddProductionModal
        show={showAddProductionModal}
        handleClose={handleClose}
      />
    </div>
  );
};
