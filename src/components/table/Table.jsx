import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export const Table = ({ columns, rows }) => {
  return (
    <Box
      sx={{
        /* height: 400, */
        maxHeight: 500,
        width: "90vw",
        background: "#212121",
        borderRadius: ".5rem",
        margin: "2rem",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row?._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
      />
    </Box>
  );
};
