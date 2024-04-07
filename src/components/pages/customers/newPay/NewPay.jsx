import React, { useEffect, useState } from "react";
import "./newPay.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { Alert, Box, Button, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../../../store/slices/customers/thunks";
import { addNewPay } from "../../../../store/slices/pay/thunks";
import { addNewSale } from "../../../../store/slices/sales/thunks";
import { messageManager } from "../../../../store/slices/pay/paySlice";
import { useNavigate } from "react-router-dom";

export const NewPay = () => {
  const { customers, isLoading } = useSelector((state) => state.customers);
  const { message } = useSelector((state) => state.pay);
  const { inputInfo, getInput } = useForm();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const startDate = new Date("Jul 12 2011");
  const endDate = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customers.length) {
      dispatch(getAllCustomers());
    }
    dispatch(addNewSale(startDate, endDate));
  }, []);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.barName,
  });

  useEffect(() => {
    if (message.message) {
      setTimeout(() => {
        dispatch(messageManager({}));
        navigate("/main");
      }, 3000);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPay({ ...inputInfo, ["customer"]: value._id }));
  };

  return (
    <div className="newPay_container">
      <BackArrow />
      <div className="box_container">
        <h2 className="titlePay">New Pay</h2>
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
            <Autocomplete
              onChange={(s, newValue) => {
                setValue(newValue);
              }}
              id="customer"
              options={customers}
              getOptionLabel={(option) => option.barName}
              filterOptions={filterOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="customer" />
              )}
            />
            <TextField
              id="amount"
              name="pay"
              label="amount"
              type="number"
              onChange={getInput}
            />
          </div>
          {message.message && (
            <Alert severity={message.type}>{message?.message}</Alert>
          )}
          <div className="button_container">
            <Button variant="contained" type="submit">
              Add new pay
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};
