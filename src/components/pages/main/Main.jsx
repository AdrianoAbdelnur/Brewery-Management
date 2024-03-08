import React from "react";
import "./main.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  let navigate = useNavigate();

  const moveTo = (place) => {
    navigate(place);
  };
  return (
    <div className="main_container">
      <div className="info_container clientColor">
        <h3>Customers</h3>
        <div className="buttons_container">
          <Button
            variant="contained"
            className="optionButton"
            color="secondary"
            onClick={() => moveTo("/customersInfo")}
          >
            Customers information
          </Button>
          <Button
            variant="contained"
            className="optionButton"
            color="secondary" /* onClick={()=>moveTo("/barrelsPerCustomer")} */
          >
            barrels per customer
          </Button>
          <Button
            variant="contained"
            className="optionButton secondary"
            color="secondary" /* onClick={()=>moveTo("/addclient")} */
          >
            Add a new customer
          </Button>
          <Button
            variant="contained"
            className="optionButton"
            color="secondary" /* onClick={()=>moveTo("/pay")} */
          >
            New Pay
          </Button>
        </div>
      </div>
      <div className="info_container barrelColor">
        <h3>Barrels</h3>
        <div className="buttons_container">
          <Button
            variant="contained"
            className="optionButton"
            color="secondary"
            onClick={() => moveTo("/barrels")}
          >
            Barrels
          </Button>
          <Button
            variant="contained"
            className="optionButton"
            color="secondary"
            /* onClick={() => moveTo("/statusInformation")} */
          >
            Information status
          </Button>
          <Button
            variant="contained"
            className="optionButton"
            color="secondary"
            /* onClick={() => moveTo("/workingPage")} */
          >
            barrel per client
          </Button>
        </div>
      </div>
    </div>
  );
};
