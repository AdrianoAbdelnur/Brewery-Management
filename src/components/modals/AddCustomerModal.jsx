import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  addNewCustomer,
  editCustomer,
} from "../../store/slices/customers/thunks";

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

export const AddCustomerModal = ({ show, handleClose, customertoEdit }) => {
  const dispatch = useDispatch();
  const { inputInfo, getInput } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputInfo) {
      if (!customertoEdit && inputInfo) {
        dispatch(addNewCustomer(inputInfo));
      } else if (customertoEdit) {
        dispatch(editCustomer(customertoEdit._id, inputInfo));
      }
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{customertoEdit ? "Edit Customer" : "Add a Customer"}</h2>
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
                <TextField
                  id="barName"
                  name="barName"
                  label="Bar Name"
                  type="text"
                  onChange={getInput}
                  defaultValue={customertoEdit?.barName}
                />
                <TextField
                  id="barManager"
                  name="barManager"
                  label={"Bar Manager"}
                  type="text"
                  onChange={getInput}
                  defaultValue={customertoEdit?.barManager}
                />
                <TextField
                  id="owner"
                  name="owner"
                  label="Owner"
                  type="text"
                  onChange={getInput}
                  defaultValue={customertoEdit?.owner}
                />
                <TextField
                  id="location"
                  name="location"
                  label="Location"
                  type="text"
                  onChange={getInput}
                  defaultValue={customertoEdit?.location}
                />
              </div>
              <div className="button_container">
                <Button variant="contained" color="error" onClick={handleClose}>
                  cancel
                </Button>
                <Button variant="contained" type="submit">
                  {customertoEdit ? "Edit Customer" : "Add Customer"}
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
