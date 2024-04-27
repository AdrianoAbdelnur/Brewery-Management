import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./modalStyles.css";
import { useDispatch } from "react-redux";
import { updatePrice } from "../../store/slices/sales/thunks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "#0c0c0c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export const ModifyPriceModal = ({ show, handleClose, id, item }) => {
  const [disableRadio, setDisableRadio] = useState();
  const [priceToChange, setPriceToChange] = useState();
  const dispatch = useDispatch();
  const price = item?.price;

  useEffect(() => {
    setPriceToChange(price);
  }, [price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[4].value) {
      dispatch(updatePrice(id, e.target[4].value));
    } else {
      for (const option of e.target) {
        if (option.checked === true) {
          dispatch(
            updatePrice(id, Math.round(parseFloat(option.value) * price))
          );
        }
      }
    }
    handleClose();
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {item?.paid === 0 ? (
        <Box sx={style}>
          <h2>Set a new price:</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl className="formPrice">
              <div className="porcentDiscount">
                <div>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup name="discounts">
                    <FormControlLabel
                      value="0.95"
                      control={<Radio />}
                      label="5% off"
                      disabled={disableRadio}
                      onChange={() =>
                        setPriceToChange(Math.round(0.95 * price))
                      }
                    />
                    <FormControlLabel
                      value="0.90"
                      control={<Radio />}
                      label="10% off"
                      disabled={disableRadio}
                      onChange={() => setPriceToChange(Math.round(0.9 * price))}
                    />
                    <FormControlLabel
                      value="0.85"
                      control={<Radio />}
                      label="15% off"
                      disabled={disableRadio}
                      onChange={() =>
                        setPriceToChange(Math.round(0.85 * price))
                      }
                    />
                    <FormControlLabel
                      value="0.80"
                      control={<Radio />}
                      label="20% off"
                      disabled={disableRadio}
                      onChange={() => setPriceToChange(Math.round(0.8 * price))}
                    />
                  </RadioGroup>
                </div>
                {!disableRadio && (
                  <div className="finalPrice">$ {priceToChange} per liter</div>
                )}
              </div>
              <TextField
                id="price"
                name="price"
                label="Enter a new price"
                type="number"
                onFocus={() => setDisableRadio(true)}
                onBlur={() => setDisableRadio(false)}
                onChange={(e) => setPriceToChange(e.target.value)}
              />
              <div className="button_container">
                <Button variant="contained" color="error" onClick={handleClose}>
                  cancel
                </Button>
                <Button variant="contained" type="submit">
                  Set new price
                </Button>
              </div>
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Box sx={style}>
          The price cannot be changed because a payment has been assigned to it
        </Box>
      )}
    </Modal>
  );
};
