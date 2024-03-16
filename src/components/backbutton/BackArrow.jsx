import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import "./backButton.css";
import { useNavigate } from "react-router-dom";

export const BackArrow = () => {
  let navigate = useNavigate();
  return (
    <div className="backButton_container">
      <Button onClick={() => navigate("/main")} className="backButton">
        <ArrowBackIcon />
        back
      </Button>
    </div>
  );
};
