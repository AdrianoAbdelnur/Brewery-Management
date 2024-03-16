import React from "react";
import "./header.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/auth/authSlice";

export const Header = () => {
  /* const { isLogged, user } = state; */
  const { isLogged, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="header_container">
      {isLogged && (
        <>
          hola {user?.name} your role is : {user?.role}
          <Button variant="contained" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </>
      )}
      {!isLogged && <div>HEADER</div>}
    </div>
  );
};
