import React from "react";
import "./login.css";
import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login_contianer">
      <div className="box_container">
        <Box
          component="form"
          /* onSubmit={handleSubmit} */
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
              /* onChange={getInput} */
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              /*  onChange={getInput} */
            />
          </div>
          <div className="link_container">
            <Link to="/auth/register" className="link">
              Register
            </Link>
            <Link to="/main" className="link">
              Password Recovery
            </Link>
          </div>
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
