import React, { useEffect } from "react";
import "./login.css";
import { Alert, Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";

import { getLogin } from "../../../store/slices/auth/thunks";
import { authMessage } from "../../../store/slices/auth/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);
  const { inputInfo, getInput } = useForm();

  useEffect(() => {
    if (message.message) {
      setTimeout(() => {
        dispatch(authMessage({}));
      }, 3000);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getLogin(inputInfo.email, inputInfo.password));
  };

  return (
    <div className="login_contianer">
      <div className="box_container">
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
              id="userName"
              name="email"
              label="User Name"
              type="text"
              autoComplete="current-password"
              onChange={getInput}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={getInput}
            />
          </div>
          <div className="link_container">
            <Link to="/auth/register" className="link">
              Register
            </Link>
            <Link to="/main" className="link">
              Forgot password?
            </Link>
          </div>
          {message.message && (
            <Alert severity={message?.type}>{message?.message}</Alert>
          )}
          <div className="button_container">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};
