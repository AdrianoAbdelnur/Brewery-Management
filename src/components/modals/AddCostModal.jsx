import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { addNewCost } from "../../store/slices/costs/thunks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0c0c0c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

const costsCenter = ["Production", "Marketing", "Maintenance", "Other"];

export const AddCostModal = ({ show, handleClose }) => {
  const [centerCosts, setCenterCosts] = useState();
  const { inputInfo, getInput } = useForm();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...inputInfo, costCenter: costsCenter });
    dispatch(addNewCost({ ...inputInfo, costCenter: centerCosts }));
    handleClose();
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option,
  });

  return (
    <div>
      {" "}
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Add Cost</h2>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component={"span"}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "45ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="textFields_container">
                <DatePicker name="date" onChange={getInput} />
                <TextField
                  id="item"
                  name="item"
                  label="Item"
                  type="text"
                  onChange={getInput}
                  required
                />
                <TextField
                  id="supplier"
                  name="supplier"
                  label="supplier"
                  type="text"
                  onChange={getInput}
                  required
                />
                <Autocomplete
                  onChange={(s, newValue) => {
                    setCenterCosts(newValue);
                  }}
                  id="costsCenter"
                  options={costsCenter}
                  getOptionLabel={(option) => option}
                  filterOptions={filterOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Center Cost" />
                  )}
                />
                <TextField
                  id="cost"
                  name="cost"
                  label="Cost"
                  type="number"
                  onChange={getInput}
                  required
                />
              </div>
              <div className="button_container">
                <Button variant="contained" color="error" onClick={handleClose}>
                  cancel
                </Button>
                <Button variant="contained" type="submit">
                  Add Cost
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
