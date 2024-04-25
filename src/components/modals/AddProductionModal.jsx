import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "../../store/slices/beerStyles/thunks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addNewProduction } from "../../store/slices/productions/thunks";
import "./modalStyles.css";
import { productionsMsg } from "../../store/slices/productions/productionsSlice";

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

export const AddProductionModal = ({ show, handleClose }) => {
  const { styles } = useSelector((state) => state.styles);
  const { message } = useSelector((state) => state.productions);
  const dispatch = useDispatch();
  const [beerStyle, setBeerStyle] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    if (show) {
      if (!styles?.length) {
        dispatch(getAllStyles());
      }
    }
  }, [show]);

  useEffect(() => {
    if (message?.message) {
      setTimeout(() => {
        dispatch(productionsMsg({}));
        handleClose();
      }, 3000);
    }
  }, [message]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProduction({ style: beerStyle, date }));
  };
  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>New Production</h2>
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
            <DatePicker onChange={(e) => setDate(e.$d)} />
            <Autocomplete
              onChange={(s, newValue) => {
                setBeerStyle(newValue);
              }}
              id="styles"
              options={styles}
              getOptionLabel={(option) => option.name}
              filterOptions={filterOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="customer" />
              )}
            />
          </div>
          {message?.message && (
            <Alert severity="success">{message?.message}</Alert>
          )}
          <div className="button_container">
            <Button variant="contained" type="submit">
              Add new pay
            </Button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};
