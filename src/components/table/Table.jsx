import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

export const Table = ({ columns, rows, cellsStyle = null, toolbar = true }) => {
  return (
    <Box
      sx={{
        maxHeight: 700,
        width: "92%",
        background: "#212121",
        borderRadius: ".5rem",
        margin: "2rem",
        "& .inTime": {
          backgroundColor: "#b9d5ff91",
          color: "#ffffff",
        },
        "& .exceded": {
          backgroundColor: "#950101",
          color: "#ffffff",
        },
      }}
    >
      <DataGrid
        rows={rows}
        rowHeight={40}
        columns={columns}
        getRowId={(row) => row?._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        slots={
          toolbar
            ? {
                toolbar: GridToolbar,
              }
            : ""
        }
        getCellClassName={(params) => {
          if (
            params.field === "barName" ||
            params.value == null ||
            cellsStyle !== "barrels"
          ) {
            return "";
          }
          return params.value >= 1 ? "exceded" : "inTime";
        }}
      />
    </Box>
  );
};
