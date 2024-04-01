import {
  Alert,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewStyle } from "../../store/slices/beerStyles/thunks";
import { stylesmsg } from "../../store/slices/beerStyles/stylesSlice";

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

export const AddStyleModal = ({ show, handleClose }) => {
  const { inputInfo, getInput } = useForm();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.styles);

  useEffect(() => {
    if (message?.message) {
      setTimeout(() => {
        dispatch(stylesmsg({}));
        handleClose();
      }, 3000);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewStyle(inputInfo));
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
          <h2>Add New Style</h2>
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
                  id="style"
                  name="name"
                  label="Style"
                  type="text"
                  onChange={getInput}
                />
                <TextField
                  id="price"
                  name="price"
                  label={"Price"}
                  type="number"
                  onChange={getInput}
                />
              </div>
              {message?.message && (
                <Alert severity="success">{message?.message}</Alert>
              )}
              <div className="button_container">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                  disabled={message.message}
                >
                  cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={message.message}
                >
                  Add New Style
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
