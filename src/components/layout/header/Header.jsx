import React, { useContext } from "react";
import "./header.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "@mui/material";

export const Header = () => {
  const { state, logout } = useContext(AuthContext);
  const { isLogged, user } = state;
  return (
    <div className="header_container">
      {isLogged && (
        <>
          hola {user.name} your role is : {user.role} and your id is: {user.id}
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </>
      )}
      {!isLogged && <div>HEADER</div>}
    </div>
  );
};
