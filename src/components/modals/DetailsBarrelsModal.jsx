import { Box, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { Table } from "../table/Table";
import { DataGrid } from "@mui/x-data-grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#0c0c0c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export const DetailsBarrelsModal = ({ show, handleClose, rows }) => {
  const columns = [
    {
      field: "order",
      headerName: "#",
      type: "number",
      width: 60,
      hideable: false,
    },
    {
      field: "cap",
      type: "number",
      headerName: "Capacity",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      width: 200,
    },
    {
      field: "deliDate",
      headerName: "Delivered Date",
      type: "string",
      width: 150,
    },
    {
      field: "style",
      headerName: "style",
      type: "string",
      width: 150,
    },
  ];

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>BAR: {rows[0]?.customer}</h2>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Modal>
  );
};
