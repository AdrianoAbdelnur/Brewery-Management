import React, { useEffect, useState } from "react";
import "./informationStatus.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarrels } from "../../../../store/slices/barrels/thunks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BackArrow } from "../../../backbutton/BackArrow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, Grid, IconButton } from "@mui/material";
import { formatDate } from "date-fns";

export const InformationStatus = () => {
  const { barrels } = useSelector((state) => state.barrels);
  const [open, setOpen] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!barrels.length) {
      dispatch(getAllBarrels());
    }
  }, []);

  return (
    <div className="infoStatus_container">
      <BackArrow />
      <TableContainer
        component={Paper}
        sx={{
          width: "92%",
          background: "#212121",
          borderRadius: ".5rem",
          margin: "2rem",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>details</TableCell>
              <TableCell>Index</TableCell>
              <TableCell>id</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Capacity</TableCell>
              <TableCell align="right">Change Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barrels.map((barrel, index) => (
              <>
                <TableRow key={barrel.name}>
                  <TableCell>
                    <IconButton
                      onClick={() => setOpen(open === index ? -1 : index)}
                    >
                      {open === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{barrel.id}</TableCell>
                  <TableCell>{barrel.statusBarrel}</TableCell>
                  <TableCell align="right">{barrel.capacity}</TableCell>
                  <TableCell align="right">
                    {formatDate(barrel.statusDate, "dd-MM-yyyy")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      paddingButton: 0,
                      paddingTop: 0,
                      border: "0px",
                    }}
                  >
                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <Box
                        sx={{
                          width: "100%",
                          backgroundColor: "rgba(100,100,100,0.5)",
                          minHeight: 40,
                          textAlign: "center",
                          aligndivs: "center",
                        }}
                      >
                        {barrel.statusBarrel === "delivered to customer" ? (
                          <div>
                            <div>Delivered to : {barrel.customer.barName}</div>
                            <div>Style: {barrel.style.name}</div>
                          </div>
                        ) : barrel.statusBarrel === "full in factory" ? (
                          <div>
                            <div style={{ height: "100%", paddingTop: "8px" }}>
                              Style: {barrel.style.name}
                            </div>
                          </div>
                        ) : (
                          <div style={{ height: "100%", paddingTop: "8px" }}>
                            There is no information to show. The barrel is empty
                            in factory
                          </div>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
